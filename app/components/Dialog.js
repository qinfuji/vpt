import Component , {bindProp}  from './Component';
import {createAction} from 'redux-act';
import {bindAction ,bundle , selectState} from '../store';
import {defaultReduce , $register} from './utils';
import RDialog from './RDialog';

const _initData = {
    show:false,
    title:"Dialog",
    width:400,
    height:400,
    dragable:true,
    opacity:0
};

const close = createAction("close" , (id)=>({id , 'show':false}));
bundle(close , defaultReduce);

const open  = createAction("open" , (id ,title, childId)=>({id , title, childId}));
bundle(close , function(state , payload){
    return {...state , ...payload , show:true};
});

export default function Dialog(initData = {..._initData}){
    Component.apply(this, [initData]);
}

Dialog.prototype.constructor = Dialog;
Dialog.prototype = Object.create(Component.prototype);
Dialog.prototype.close = bindAction(close);
Dialog.prototype.open = bindAction(open);

const _mapStateToProps = (state)=>({
        show : state['show'],
        width : state['width'],
        height : state['height'],
        dragable:state['dragable'],
        title : state['title']
    });

const _mapDispatchToProps = (dialog , context , state) => {
    return {};
};

$register(Dialog,RDialog,_mapStateToProps,_mapDispatchToProps);