import React from 'react';
import ReactDom from "react-dom";
import ReactButton from './react/component/Button';
import 'babel-polyfill';
import {createStore} from 'redux';
import _ from 'lodash';



class StoreProxy {

    constructor() {
        this.store = createStore(this.setState.bind(this), { root: null, components: {} });
    }

    subscribe(listener) {
        return this.store.subscribe(listener);
    }

    bind(component) {
        //注册组件更新时间
        component.store = this;
        component.addListener(this.update.bind(this));
    }

    setState(state, action) {
        if (action.type == "CHANGE_DATA") {
            return _.assign({}, state, {
                components: _.assign({}, state.components, { [action.payload.id]: action.payload })
            });
        } else if (action.type == "REMOVE_COMPONENT") {
            let id = action.payload.id;
            let _state = _.assign({}, state);
            delete _state['components'][id];
            return _state;
        }
        return state;
    }

    update(action) {
        this.store.dispatch(action);
    }

    getState() {
        return this.store.getState();
    }

    find(id) {
        var compoentData = this.store.getState()['idMap'][id];
    }
}

class Component {
    constructor() {
        this.listeners = [];
        this._id = _.uniqueId(this.type + "_");
    }

    get id() {
        return this._id;
    }

    set name(name) {
        this._name = name;
        this.update();
    }

    get name() {
        return this._name;
    }

    get parent() {
        return this._parent;
    }

    set parent(parent) {
        this._parent = parent;
    }

    set store(store) {
        this._store = store;
    }

    get store() {
        if (this._store) {
            return this._store;
        }
        return this._parnet.getStore();
    }

    /**
     * 重新加载配置数据
     * 
     * @param data 初始配置
     */
    _reload(data) {
        this.reload(data);
        this.upate();
    }

    remove() {
        this.update('REMOVE_COMPONENT', this);
    }

    reload(data) {
        throw new Error("subclass implement");
    }

    getState() {
        throw new Error("subclass implements");
    }

    addListener(listener) {
        this.listeners.push(listener);
        return () => {
            var index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    }

    update(type, payload) {
        this.listeners.slice().forEach(listener => listener({
            type: type || "CHANGE_DATA",
            payload: payload || this.getState()
        }));
    }
}

class Container extends Component {
    constructor(props) {
        super(props);
    }
}


class ButtonComponent extends Component {

    constructor(label) {
        super();
        this._label = label;
    }

    set label(label) {
        this._label = label;
        this.update();
    }

    get label() {
        return this._label;
    }

    getState() {
        return {
            id: this.id,
            label: this._label,
            type: this.type,
            name: this.name
        };
    }
}
ButtonComponent.prototype.type = "my.Button";
var myButton = new ButtonComponent();


function render(component, containerElement) {
    var storeProxy = new StoreProxy();
    storeProxy.bind(component);
    component.label = "aaaaaa";
    component.name = "testButton";
    component.remove();
}

render(myButton, document.getElementById("root"));


//ReactDom.render(<ReactButton/ > , document.getElementById("root"));