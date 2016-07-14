import Component , {bindProp}  from './Component';
import {createAction} from 'redux-act';
import {bindAction ,bundle , selectState , store} from '../store';
import {defaultReduce , $register, $view} from './utils';
import RDialog from './RDialog';
import ReactDom from "react-dom";
import React from 'react';

let modalContainer = null;

const _initData = {
    dialogs:{}
};

const close = createAction("close" , (id)=>({id , 'show':false}));
bundle(close , defaultReduce);

const open  = createAction("open" , (id , childId , options)=>({id , childId, options}));
bundle(open , function(state , payload){
    var childId = payload.childId;
    var dialogOpts = payload.options;
    var dialogs = state['dialogs'];
    let ret = {...state , dialogs:{...dialogs , [childId]:dialogOpts}};
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

const _mapStateToProps = (state)=>({
        id:state['id'],
        dialogs:state['dialogs']
});

const _mapDispatchToProps = (dialog , context , state) => {
    return {};
};

$register(Dialog,RDialog,_mapStateToProps,_mapDispatchToProps);



function createContainer (dialog) {
  modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  let DialogWraped = $view(dialog.id , null);
  ReactDom.render(<DialogWraped store={store}/>, modalContainer);
}