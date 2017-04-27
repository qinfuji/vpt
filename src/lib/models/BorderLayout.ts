import { observable, toJS, action } from 'mobx';
import { Component } from './Component';
import { Panel } from './Panel';
import { GridLayoutOption } from './GridLayoutOption';
import { Container } from './Container';

export const enum BorderLayoutOption {
    NORTH, WEST, SOUTH, EAST, CENTER
}

export class BorderLayout {


    readonly north: Container = new Container(); //北
    readonly west: Container = new Panel();  //西
    readonly south: Container = new Container(); //南
    readonly east: Container = new Container();  //東
    readonly center: Container = new Container();

    constructor() {
        this.north.width = '100%';
        this.north.height = 70;
        this.south.width = '100%';
        this.south.height = 70;
        this.west.width = '20%';
        this.west.height = '100%';
        this.east.width = '20%';
        this.east.height = '100%';
    }

    @observable title: string = "button";

    addLayoutComponent(comp: Component, constraints: BorderLayoutOption, gridLayoutOption: GridLayoutOption) {
        if (constraints == BorderLayoutOption.EAST) {
            this.east.addComponent(comp, gridLayoutOption);
        } else if (constraints == BorderLayoutOption.NORTH) {
            this.north.addComponent(comp, gridLayoutOption);
        } else if (constraints == BorderLayoutOption.SOUTH) {
            this.south.addComponent(comp, gridLayoutOption);
        } else if (constraints == BorderLayoutOption.WEST) {
            this.west.addComponent(comp, gridLayoutOption);
        } else if (constraints == BorderLayoutOption.CENTER) {
            this.center.addComponent(comp, gridLayoutOption);
        }
    };

    // /**
    //  * 设置North高度
    //  */
    // @action set northHeight(height: number) {

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