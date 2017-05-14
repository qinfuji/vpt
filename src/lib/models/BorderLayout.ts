import { observable, toJS, action, computed } from 'mobx';
import { Component } from './Component';
import { Panel } from './Panel';
import { GridLayoutOption } from './GridLayoutOption';
import { SplitPanel } from './SplitPanel';

export const enum BorderLayoutOption {
    NORTH, WEST, SOUTH, EAST, CENTER
}

export class BorderLayout extends Component {


    // readonly north: SplitPanel = new Panel(); //北
    // readonly west: SplitPanel = new Panel();  //西
    // readonly south: SplitPanel = new Panel(); //南
    // readonly east: SplitPanel = new Panel();  //東
    // readonly center: SplitPanel = new Panel();

    constructor() {
        super();
    }

    calculatePanel() {

    }

    parentMounted() { }

    // addLayoutComponent(comp: Component, constraints: BorderLayoutOption, gridLayoutOption: GridLayoutOption) {
    //     if (constraints == BorderLayoutOption.EAST) {
    //         this.east.addComponent(comp, gridLayoutOption);
    //     } else if (constraints == BorderLayoutOption.NORTH) {
    //         this.north.addComponent(comp, gridLayoutOption);
    //     } else if (constraints == BorderLayoutOption.SOUTH) {
    //         this.south.addComponent(comp, gridLayoutOption);
    //     } else if (constraints == BorderLayoutOption.WEST) {
    //         this.west.addComponent(comp, gridLayoutOption);
    //     } else if (constraints == BorderLayoutOption.CENTER) {
    //         this.center.addComponent(comp, gridLayoutOption);
    //     }
    // };

    // /**
    //  * 设置North高度
    //  */
    // @computed set northSize(size: number) {

    // }

    // /**
    //  * 设置South高度
    //  */
    // @action set southHeigth(heigth: number) {

    // }

    // /**
    //  * 设置east宽度
    //  */
    // @action set eastWidth(width: number) {

    // }

    // /**
    //  * 设置west宽度
    //  */
    // @action set westWidth(width: number) {

    // }

}