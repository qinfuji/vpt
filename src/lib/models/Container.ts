
import { observable, toJS } from 'mobx';
import { Component } from './Component';
import { GridLayoutOption } from './GridLayoutOption';

export class Container extends Component {

    /**
     * 组件数组
     */
    @observable private compments: Component[] = [];
    @observable private componentsGridInfo: GridLayoutOption[] = [];

    /**
     * 是否显示滚动条
     */
    @observable scrollable: boolean = false;


    /**
     * 检测是否是自己
     * @param 待检测的组件
     */
    checkAddToSelf(comp: Component): void {
        throw new Error("没有实现")
    };

    /**
     * add component
     * @param comp add component
     * @param grid GridLayoutOption
     */
    addComponent(comp: Component, grid: GridLayoutOption): void {
        this.checkAddToSelf(comp);
        this.compments.push(comp);
        comp.parent = this;
        this.componentsGridInfo.push(grid);
    };

    /**
     * remove component
     * @param comp  remove component
     * @return 
     */
    removeComponent(comp: Component): boolean {
        let index = this.compments.indexOf(comp);
        if (index >= 0) {
            this.compments.slice(index, 1);
            this.componentsGridInfo.slice(index, 1);
            return true;
        }
        return false;
    }

}