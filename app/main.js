import React from 'react';
import ReactDom from "react-dom";
import ReactButton from './react/component/Button';
import 'babel-polyfill';
import reactClassFactory from './ReactClassFactory';

class Store {
    constructor() {

    }
}

class UpdateNotify {

    constructor() {
        this.listeners = [];
    }

    getSate() {
        throw new Error("subclass implement");
    }

    notifUpdate() {
        this.listeners.forEach(listener => listener(this.id));
    }

    onUpdate(listener) {
        this.listeners.push(listener);
    }


}

class Component extends UpdateNotify {
    constructor() {
        super();
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get parent() {
        return this._parent;
    }

    set parent(parent) {
        this._parent = parent;
    }

    getStore() {
        if (this.parnet) {
            return this.parent.getStore();
        }
        this.store = new Store();
        return this.store;
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
Button1.prototype.type = "my.Button";
reactClassFactory.register(Button1.prototype.type , ReactButton);

class Page extends Container {

    constructor(props) {
        super();
        this.root = "";
        this.children = [];
    }

    render(containerElement, component) {
        console.log("page render");
        return <div></div>;
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


ReactDom.render(<ReactButton/>, document.getElementById("root"));