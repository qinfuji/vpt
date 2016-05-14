import React from 'react';
import ReactDom from "react-dom";
import ReactButton from './react/component/Button';
import 'babel-polyfill';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import _ from 'lodash';


function Action(target, key, descriptor) {
    descriptor.enumerable = true;
    return descriptor;
};


class Component {

    constructor() {
        this._id = _.uniqueId(this.type + "_");
        this.listeners = [];
    }

    get id() {
        return this._id;
    }

    getState() {
        return {
            id: this._id,
            type: this.type
        };
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

    getReactClass() {
        
        var _self = this;
        var actions = _.reduce(_.functionsIn(this), function (result, v) {
            result[v] = _self[v].bind(_self);
            return result;
        }, {});
        function mapStateToProps(component) {
            return function (state) {
                return _.assign({} , state[component.id] , actions);
            };
        }
        return connect(mapStateToProps(this))(this.ReactClass);
    }
}


class ButtonComponent extends Component {

    constructor(label) {
        super();
        this._label = label;
    };


    set label(label) {
        this._label = label;
    };

    get label() {
        return this._label;
    }

    @Action
    onClick() {
        console.log("ButtonComponent onClick" , this.id);
    }

    getState() {
        return _.assign({}, super.getState(), {
            label: this._label
        });
    }
}
ButtonComponent.prototype.type = "MyButton";
ButtonComponent.prototype.ReactClass = ReactButton;


class XYLayoutReaclClass extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let children = this.props.children;
        console.log(this.props);
        var ret = children.map((c, index) => {
            let style = {

            };
            var WrapComponent = c.ReactClass;
            return <WrapComponent key={index}></WrapComponent>;
        });
        return (<div style={{ width: '10px' }}>{ret}</div>);
    }
}

class XYLayout extends Component {

    constructor() {
        super();
        this.children = [];
    };

    append(component, x, y) {
        x = x || 0;
        y = y || 0;
        this.children.push({
            x: x, y: y, component: component
        });
    }

    getState() {
        let c = _.map(this.children, function (component) {
            return {
                x: component.x,
                y: component.y,
                ReactClass: component.component.getReactClass()
            };
        });
        let state = { [this.id]: _.assign({}, super.getState(), { children: c }) };
        this.children.forEach(function (child) {
            state[child.component.id] = child.component.getState();
        });
        return state;
    };
}
XYLayout.prototype.type = "XYLayout";
XYLayout.prototype.ReactClass = XYLayoutReaclClass;

class MyPage extends Component {


    constructor(layout) {
        super();
        this.root = layout || new XYLayout();
    }

    append(component) {
        this.root.append(component);
    }

    getState() {
        return this.root.getState();
    }

    getReactClass() {
        return this.root.getReactClass();
    }
}

var myPage = new MyPage();
var btn1 = new ButtonComponent("MyButton1");
var btn2 = new ButtonComponent("MyButton2");
myPage.append(btn1);
myPage.append(btn2);
btn2.onClick  = function(){
    console.log("proxy btn2" , this.label);
};

function reduce(state, action) {
    return state;
}

var store = createStore(reduce, myPage.getState());
var WrapMyPage = myPage.getReactClass();

ReactDom.render(<Provider store={store}><WrapMyPage></WrapMyPage></Provider>, document.getElementById("root"));