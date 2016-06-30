import {createAction} from 'redux-act';
import {bindAction , mapStateToProps,mapDispatchToProps , defaultReduce} from './utils';
import {bundle , selectState} from '../store';
import Component , {propSelector , bindProp}  from './Component';
import {emptyFun} from '../utils';

const setLabel = createAction('setLabel',(id ,label)=>({id ,label}));
bundle(setLabel , defaultReduce);

const onClick = createAction('onClick' , (id , fnName)=>({id , onClick:fnName}));
bundle(onClick , defaultReduce);

export default function Button(){
    Component.apply(this, arguments);
}
Button.prototype.constructor = Button;
Button.prototype = Object.create(Component.prototype);
Button.prototype.onClick = bindAction(onClick);
Button.prototype.type = "Button";
Button.prototype.setLabel = bindAction(setLabel);
Button.prototype.getLabel = bindProp('label');


const _mapStateToProps = function(button){
    return (state)=>({
        label : propSelector(state)(button.id)('label')
    });
};
mapStateToProps.register(Button.prototype.type , _mapStateToProps);


const _mapDispatchToProps = button => diapatch => {
    return {
        onClick : function(e , context){
            //这里获取事件的配置
            let eventName = selectState(propSelector)(button.id)('onClick');
            if(eventName){
                context[eventName].apply(context , e);
            }
        }
    };
};
mapDispatchToProps.register(Button.prototype.type , _mapDispatchToProps);