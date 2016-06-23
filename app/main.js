import ReactDom from "react-dom";
import React from 'react';
import {createStore,combineReducers,compose} from 'redux';
import {createAction,createReducer,assignAll} from 'redux-act';
import {connect, Provider} from 'react-redux';
var R = require('ramda');

function _createReducer(asyncReducers) {
    return combineReducers({
        ...asyncReducers
    });
}

function configureStore(initialState) {
    let store = createStore(_createReducer(), initialState);
    store.asyncReducers = {};
    return store;
}

function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(_createReducer(store.asyncReducers));
}


const emptyFun = function() {};


const genId = function() {
    let id = 1;
    return function() {
        return ++id;
    };
}();

function bundleAction(component , action , reduce){
    component.handlers[action] = reduce;
    action.assignTo(component.store);
}


/**
 * 所有组件的基类
 * @param store
 * @param initData
 */
function Component(store, initData = {} , isRef=false) {
    this.store = store;
    this.handlers = {};
    this.actions = {};
    let setId = createAction('setId', id => id);

    this.bundleAction(setId , (state, id) => ({...state,id: id}));
    initData.type = this.type;
    let reduce = createReducer(this.handlers, initData);
    if (!initData.id) { //如果id没有创建则需要构造reduce
        initData.id = this.type + "_" + genId();
        injectAsyncReducer(store, initData.id, reduce);
        setId(initData.id);
    }
    let _self = this;
    return {
        get id(){
            return initData.id;
        },

        get type(){
            return initData.type;
        }
    };
}

Component.prototype.map = function(f){
    let state = this.store.getState()[this.getId()];
    return f(state);
};

Component.prototype.bundleAction = function(action , reduce){
    
    this.handlers[action] = reduce;
    action.assignTo(this.store);
};



function Button(store ,initData = {}) {
    var parent = Component.apply(this, arguments);
    const setLabel = createAction('setLabel', label => label);
    this.bundleAction(setLabel , (state, label) => ({...state,label: label}));
    let _self = this;
    return {
        ...parent,
        setLabel,
        onClick: function () {
            _self.onClick();
        },
        get state() {
            return _self.map(R.identity);
        }
    };
}
Button.prototype.constructor = Button;
Button.prototype = Object.create(Component.prototype);
Button.prototype.onClick = emptyFun;
Button.prototype.type = "Button";


class RButton extends React.Component {

    onclick(e) {
        this.props.onClick(e);
    }

    render() {
        return (
            <button onClick={this.onclick.bind(this) }>{this.props.label}</button>
        );
    }
}


function ReactClassFactory(){
    var cache = {};
    return function(){
        this.register = function(type , react){
            cache[type] = react;
        };

        this.get = function(type){
            return cache[type];
        };
    };
}

var factory = ReactClassFactory();
factory.register("Button" , RButton);




function render(component, containerEle) {
    let store = component.store;
    let reactComponent = factory.get(component.type);
    function connect(component) {
        return function (WrappedComponent) {
            return class WrapComponent extends React.Component {

                getChildContext() {
                    return { store: this.store };
                }

                constructor(props, context) {
                    super(props, context);
                    this.store = props.store || context.store;
                }

                handleChange() {
                    this.setState({});
                }

                trySubscribe() {
                    this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
                    this.handleChange();
                }

                componentDidMount() {
                    this.trySubscribe();
                }

                componentWillUnmount() {
                    this.tryUnsubscribe();
                }

                render() {
                    createElement(WrappedComponent,
                        {store , ...component , ...component.state}
                    );
                }
            };
        };
    }
    let WrapComponent = connect(component)(reactComponent);
    ReactDom.render(<WrapComponent></WrapComponent>, containerEle);
}

const store = configureStore({});
