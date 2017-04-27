import { observable, toJS, action } from 'mobx';
import { Component } from './Component';

export class Button extends Component {
    @observable label: string = "Button";
    @observable disabled: boolean = false;
    @observable type: string = "button";
    @action onClick() { }
}