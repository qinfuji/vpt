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

    @observable firstSzie: number | string;
    @observable secondSize: number | string;

    /**
     * 是否可以滑动
     */
    @observable dragable: boolean = true;
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
    addComponent(comp: Component, position: SplitPanelPosition , gridLayoutOption: GridLayoutOption) {
        if(position == SplitPanelPosition.FIRST){
            this.first.addComponent(comp , gridLayoutOption);
        }else if(position == SplitPanelPosition.SECOND){
            this.second.addComponent(comp , gridLayoutOption);
        }
    };

    setDragSize(x:number|string , y:number|string){
        this.parent.width;
    }
}