import {createAction} from 'redux-act';
import {bindAction , mapStateToProps,mapDispatchToProps} from './utils';
import {bundle , selectState} from '../store';
import Component from './Component';
import {emptyFun} from '../utils';

const setLabel = createAction('setLabel',(id ,label)=>({id ,label}));
bundle(setLabel , (state , payload) =>({...state , ...payload}));

const onClick = createAction('onClick' , (id , fnName)=>({id , onClick:fnName}));
const clickSelect = (state)=>(id)=>state[id].onClick;
bundle(onClick , (state , payload) =>({...state , ...payload}));

export default function Button(){
    Component.apply(this, arguments);
}
Button.prototype.constructor = Button;
Button.prototype = Object.create(Component.prototype);
Button.prototype.onClick = bindAction(onClick);
Button.prototype.type = "Button";
Button.prototype.setLabel = bindAction(setLabel);

const _mapStateToProps = function(button){
    return (state)=>({
        label : state[button.id].label
    });
};
mapStateToProps.register(Button.prototype.type , _mapStateToProps);


const _mapDispatchToProps = button => diapatch => {
    return {
        onClick : function(e , context){
            //这里获取事件的配置
            let eventName = selectState(clickSelect)(button.id);
            if(eventName){
                context[eventName].apply(context , e);
            }
        }
    };
};
mapDispatchToProps.register(Button.prototype.type , _mapDispatchToProps);