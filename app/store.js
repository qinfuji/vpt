
import {createStore} from 'redux';
import {createAction , createReducer} from 'redux-act';
import R from 'ramda';

const handlers = {};
const reduces = createReducer(handlers, {});
export const store = createStore(reduces , {}); 


const removeAction = createAction((id)=>id);
handlers[removeAction] = function(state , id){
    let ret = R.pickBy((val,key)=>key!=id , state);
    return ret;
};
removeAction.assignTo(store);


export function bindAction(action){
    return function () {
        let id = this.id;
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(id);
        action.apply(null, args);
    };
}

export function bundle(action , reduce){
    handlers[action] = function(state , payload){
        var id = payload.id;
        var _state = state[id] || {};
        var ret = reduce(_state , payload);
        return {...state , [id]:ret};
    };
    action.assignTo(store);
}

export function selectState(selector){
   return selector(store.getState());
} 

export const $remove =  removeAction;

store.subscribe(function(){
    console.log(store.getState());
});