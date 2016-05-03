import React from 'react';
import ReactDom from "react-dom";
import Button from './react/component/Button';
import 'babel-polyfill';

class Storeable {

    constructor() {
        this.listeners = [];
    }

    getSate() {
        throw new Error("subclass implement");
    }
    
    notifUpdate(){
        this.listeners.forEach(listener=>listener(this.id));
    }
    
    onUpdate(listener) {
        this.listeners.push(listener);
    }
}

class Component extends Storeable {
    constructor() {
        super();
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }
}

class Container extends Component {
    constructor(props) {
        super(props);
    }
}


class Button1 extends Component {

    constructor(label) {
        super();
        this.label = label;
    }

    getState() {
        return { label: this.label };
    }
}

class Page extends Container {

    constructor(props) {
        super();
        this.root = "";
        this.children = [];
    }

    render(containerElement, component) {
        console.log("page render");
    }

    append(component) {
        this.children.push(component);
    }
}


class MyPage extends Page {
    constructor(props) {
        super(props);
        this.button = new Button1("Label");
        this.append(this.button);
    }
}

var mypage = new MyPage();

ReactDom.render(<Button/>, document.getElementById("root"));