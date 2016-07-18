import {createAction} from 'redux-act';
import {defaultReduce , $register} from './utils';

import {bindAction ,bundle , selectState ,$remove} from '../store';
import Component , {bindProp}  from './Component';
import {emptyFun} from '../utils';
import RButton from './RButton';

const setLabel = createAction('setLabel',(id ,label)=>({id ,label}));
bundle(setLabel , defaultReduce);

const onClick = createAction('onClick' , (id , fnName)=>({id , onClick:fnName}));
bundle(onClick , defaultReduce);


const _initData = {
    label:'Button',
    disable:false,
    active:false
};

export default function Button(initData = {..._initData}){
    Component.apply(this, [{..._initData , ...initData}]);
}
Button.prototype.constructor = Button;
Button.prototype = Object.create(Component.prototype);
Button.prototype.onClick = bindAction(onClick);
Button.prototype.type = "Button";
Button.prototype.setLabel = bindAction(setLabel);
Button.prototype.getLabel = bindProp('label');

const _mapStateToProps = (state , button , context)=>({
        label : state['label'],
        disable : state['disable'],
        active : state['active'],
        id:state['id'],
        onClick : function(e){
            let eventName = state['onClick'];
            if(eventName){
                context[eventName].apply(context , e);
            }
        },
        remove : $remove
    });



$register(Button , RButton, _mapStateToProps);