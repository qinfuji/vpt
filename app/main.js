import React from 'react';
import ReactDom from "react-dom";
import ReactButton from './react/component/Button';
import 'babel-polyfill';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import _ from 'lodash';

import {Action} from './decorator';
import StoreContext from './StoreContext';
import Component from './component/Component';
import Render from './Render';

import XYLayout from './component/XYLayout';
import XYLayoutReaclClass from './react/composite/XYLayoutReaclClass';

class ButtonComponent extends Component {

    constructor(label) {
        super();
        this._label = label;
    };

    @Action
    set label(label) {
        this._label = label;
    };

    get label() {
        return this._label;
    }

    @Action
    onClick() { }

    getState(storeContext) {
        return _.assign({}, super.getState(storeContext), {
            label: this._label
        });
    }
}
ButtonComponent.prototype.type = "MyButton";
ButtonComponent.prototype.ReactClass = ReactButton;


class MyPage extends Component {


    constructor(layout) {
        super();
        this.root = layout || new XYLayout();
    }

    append(component) {
        this.root.append(component);
    }

    getState(storeContext) {
        return this.root.getState(storeContext);
    }

    getReactClass(storeContext) {
        return this.root.getReactClass(storeContext);
    }
}

var myPage = new MyPage();
var btn1 = new ButtonComponent("MyButton1");
var btn2 = new ButtonComponent("MyButton2");
myPage.append(btn1);
myPage.append(btn2);
btn2.onClick = function () {
    this.label = "aaaaaa";
    btn1.label = "btn1";
    console.log("proxy btn2", this.label);
};


Render(myPage , document.getElementById("root"));