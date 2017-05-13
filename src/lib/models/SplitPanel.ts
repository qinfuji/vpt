import { observable, toJS } from 'mobx';
import { Component } from './Component';
import { Container } from './Container';
import { GridLayoutOption } from './GridLayoutOption';

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
    readonly first: Container = new Container();
    readonly second: Container = new Container();

    /**
     * panel的比例关系,
     * eg. dividerLoaction = "150%"
     *     dividerLoaction = 100; 
     */
    @observable dividerLoaction: number | string = .5;

    /**
     * 是否可以滑动
     */
    @observable dragable: boolean = true;

    /**
     * 分割条宽度/高度
     */
    @observable dividerSize: number = 2;

    /**
     * split方向
     */
    @observable orientation: SplitPanelOrientation;

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

}