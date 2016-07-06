
import {createAction} from 'redux-act';
import {genId , defaultReduce} from './utils';
import {bindAction , bundle , selectState} from '../store';

const setId = createAction('setId',id=>({id}));
bundle(setId , defaultReduce);

const setParentId = createAction('setParent' , (id,parentId)=>({id , parentId}));
bundle(setParentId , defaultReduce);

export default function Component(id){
    this.id = id || this.type+"_"+genId();
    if(!id){
        setId(this.id , this.id);
    }
}

Component.prototype.setParentId = bindAction(setParentId);

export const propSelector = (state)=>(id)=>(propertyName)=>state[id][propertyName];

export const bindProp = function(propertyName){
    return function(){
        return selectState(propSelector)(this.id)(propertyName);
    };
};