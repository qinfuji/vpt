import Component , {bindProp}  from './Component';
import {createAction} from 'redux-act';
import {bindAction ,bundle , selectState , store} from '../store';
import {defaultReduce , $register, $view} from './utils';
import RDialog from './RDialog';
import ReactDom from "react-dom";
import React from 'react';
import R from 'ramda';
import {connect, Provider} from 'react-redux';

let modalContainer = null;

const _initData = {
    dialogs:[],
    increase:false
};

const close = createAction("close" , (id , childId)=>({id ,  childId}));
bundle(close , function(state , payload){
    var childId = payload.childId;
    var dialogs = state['dialogs'];
    dialogs = R.filter((dialog)=>dialog.id!=childId , dialogs);
    let ret = {...state , dialogs:dialogs , increase:false};
    return ret;
});

const open  = createAction("open" , (id , childId , options)=>({id , childId, options}));
bundle(open , function(state , payload){

    var dialogs = state['dialogs'];
    dialogs = R.append({id:payload.childId,options:payload.options})(dialogs);
    let ret = {...state , dialogs:dialogs , increase:true};
    return ret;
});

export default function Dialog(initData = {..._initData}){
    Component.apply(this, [{..._initData , ...initData}]);
}

Dialog.prototype.constructor = Dialog;
Dialog.prototype = Object.create(Component.prototype);
Dialog.prototype.close = bindAction(close);
Dialog.prototype.open = function(childId , options){
    if(!modalContainer){
        createContainer(this);
    }
    open(this.id , childId , options);
};
Dialog.prototype.type = "Dialog";

const _mapStateToProps = function (state, dialog, context) {
    return {
        id: state['id'],
        dialogs: state['dialogs'],
        increase: state['increase'],
        close: function () {
            let dialogs = state['dialogs'];
            if (!dialogs.length) {
                return;
            }
            dialog.close(dialogs[dialogs.length - 1].id);
        },
        open: function () {
            dialog.open(++count, { title: "打开测试" + count, width: 500, height: 200 });
        }
    };
};
let count = 0;


$register(Dialog,RDialog,_mapStateToProps);

function createContainer(dialog) {
    modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);
    let DialogWraped = $view(dialog.id, null);
    ReactDom.render(<Provider store={store}><DialogWraped/></Provider>, modalContainer);
}