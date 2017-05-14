import { observable, toJS, computed } from 'mobx';
import { Component } from './Component';
import { Container } from './Container';
import { Panel } from './Panel';
import { GridLayoutOption } from './GridLayoutOption';
import { percentToNumber } from '../utils/misc';
import * as _ from 'lodash';

export const enum SplitPanelOrientation {
    HORIZONTAL, VERTICAL
}


export const enum SplitPanelPosition {
    FIRST, SECOND
}

/**
 * split Panel
 */
export class SplitPanel extends Component {

    /**
     * 默认的split数量
     */
    readonly first: Panel = new Panel();
    readonly second: Panel = new Panel();
    readonly divider: Panel = new Panel();
    /**
     * 是否可以滑动
     */
    @observable dragable: boolean = true;

    /**
     * 分割条宽度/高度
     */
    @observable dividerSize: number = 2;

    private _dividerLocation: number | string = '50%';
    /**
     * split方向
     */
    private _orientation: SplitPanelOrientation = SplitPanelOrientation.HORIZONTAL;

    constructor();
    constructor(initData?: { orientation?: SplitPanelOrientation, dividerLocation?: number | string }) {
        super();
        if (initData && initData.dividerLocation) {
            this._dividerLocation = initData.dividerLocation;
        }
        if (initData && initData.orientation) {
            this._orientation = initData.orientation
        }
        this.calculateInnerPanel();
    }

    /**
     * 
     */
    private calculateInnerPanel() {

        let parent = this.parent;
        let parentWidth = parent ? parent.width : this.width;
        let parentHeight = parent ? parent.height : this.height;
        let splitpanelStyle = {
            width: parentWidth,
            height: parentHeight
        }
        if (this._orientation == SplitPanelOrientation.HORIZONTAL) {
            let leftWidth = 0;
            if (_.isString(this._dividerLocation)) {
                leftWidth = parentWidth * percentToNumber(this.dividerLoaction) - this.dividerSize / 2;
            } else {
                leftWidth = this._dividerLocation
            }
            let rightWidth = parentWidth - leftWidth - this.dividerSize;
            let leftPanelOption = {
                position: 'absolute',
                width: leftWidth,
                left: 0,
                top: 0,
                bottom: 0
            }
            _.assign(this.first, leftPanelOption);
            let rightPanelOptions = {
                width: rightWidth,
                right: 0,
                top: 0,
                bottom: 0,
                position: 'absolute'
            }
            _.assign(this.second, rightPanelOptions);
            let dividerPanelOptions = {
                width: this.dividerSize,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: leftWidth
            }
            _.assign(this.divider, dividerPanelOptions);
        } else if (this._orientation == SplitPanelOrientation.VERTICAL) {
            let topHeight = 0;
            if (_.isString(this._dividerLocation)) {
                topHeight = parentHeight * percentToNumber(this._dividerLocation) + this.dividerSize
            } else {
                topHeight = this._dividerLocation;
            }

            let bottomHeight = parentHeight - topHeight - this.dividerSize;

            let topPanelOptions = {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: topHeight
            }
            _.assign(this.first, topPanelOptions)
            let bottomPanelOptions = {
                height: bottomHeight,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute'
            }
            _.assign(this.second, bottomPanelOptions)
            let dividerPanelOptions = {
                position: 'absolute',
                height: this.dividerSize,
                left: 0,
                right: 0,
                top: topHeight
            }
            _.assign(this.divider, dividerPanelOptions)
        }
    }

    /**
     * panel的比例关系,
     * eg. dividerLoaction = "150%"
     *     dividerLoaction = 100; 
     */
    @computed set dividerLoaction(location: number | string) {
        this._dividerLocation = location;
        this.calculateInnerPanel();
    }

    @computed set orientation(orientation: SplitPanelOrientation) {
        this._orientation = orientation;
        this.calculateInnerPanel();
    }

    /**
     * add component
     * @param comp a component
     * @param position  add to position
     * @param 
     */
    addComponent(comp: Component, position: SplitPanelPosition, gridLayoutOption: GridLayoutOption) {
        if (position == SplitPanelPosition.FIRST) {
            this.first.addComponent(comp, gridLayoutOption);
        } else if (position == SplitPanelPosition.SECOND) {
            this.second.addComponent(comp, gridLayoutOption);
        }
    };

    parentMounted(){
        this.calculateInnerPanel()
    }
}