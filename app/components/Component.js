
import {createAction} from 'redux-act';
import {genId , defaultReduce} from './utils';
import {bindAction , bundle , selectState} from '../store';


const initDataAction = createAction('initData' , (id , initData)=>({id , initData}));
bundle(initDataAction ,  function(state , payload){
     return {...payload.initData};
});

const setParentId = createAction('setParent' , (id,parentId)=>({id , parentId}));
bundle(setParentId , defaultReduce);

export default function Component(initData = {}){
    let id = initData.id;
    this.id = initData.id || this.type+"_"+genId();
    initData.id = this.id;
    initData.type = this.type;
    if(!id){
         initDataAction(this.id , initData);
    }
}


Component.prototype.setParentId = bindAction(setParentId);

export const propSelector = (state)=>(id)=>(propertyName)=>state[id][propertyName];

export const bindProp = function(propertyName){
    return function(){
        return selectState(propSelector)(this.id)(propertyName);
    };
};
