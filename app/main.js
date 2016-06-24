import ReactDom from "react-dom";
import React from 'react';
import {createStore,combineReducers,compose} from 'redux';
import {createAction,createReducer,assignAll} from 'redux-act';
import {connect, Provider} from 'react-redux';
var R = require('ramda');

const handlers = {};
let reduces = createReducer(handlers, {});
const store = createStore(reduces , {}); 

function bundle(action , reduce){
    handlers[action] = function(state , payload){
        var id = payload.id;
        var _state = state[id] || {};
        var ret = reduce(_state , payload);
        return {...state , [id]:ret};
    };
    action.assignTo(store);
}

const genId = function() {
    let id = 0;
    return function() {
        return ++id;
    };
}();

const emptyFun = function() {};

function bindAction(action){
    return function () {
        let id = this.id;
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(id);
        action.apply(null, args);
    };
}

const setId = createAction('setId',id=>({id}));
bundle(setId , function(state , payload){
    return {...state , ...payload};
});
function Component(id){
    this.id = id || this.type+"_"+genId();
    if(!id){
        setId(this.id , this.id);
    }
}

const setLabel = createAction('setLabel',(id ,label)=>({id ,label}));
bundle(setLabel , (state , payload) =>({...state , ...payload}));
function Button(){
    Component.apply(this, arguments);
}
Button.prototype.constructor = Button;
Button.prototype = Object.create(Component.prototype);
Button.prototype.onClick = emptyFun;
Button.prototype.type = "Button";
Button.prototype.setLabel = bindAction(setLabel);

let btn1 = new Button();
btn1.setLabel("-----");

let btn2 = new Button();
btn2.setLabel("-----4");

console.log(store.getState());