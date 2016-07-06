import {createAction} from 'redux-act';
import {mapStateToProps,mapDispatchToProps , defaultReduce} from './utils';
import {bindAction ,bundle , selectState} from '../store';
import Component , {bindProp}  from './Component';
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


const _mapStateToProps = (state)=>({
        label : state['label']
    });


mapStateToProps.register(Button.prototype.type , _mapStateToProps);


const _mapDispatchToProps = context => state => {
    return {
        onClick : function(e){
            console.log(state);
            let eventName = state['onClick'];
            if(eventName){
                context[eventName].apply(context , e);
            }
        }
    };
};

mapDispatchToProps.register(Button.prototype.type , _mapDispatchToProps);