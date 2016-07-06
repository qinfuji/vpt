
import {createStore} from 'redux';
import {createReducer} from 'redux-act';

const handlers = {};
const reduces = createReducer(handlers, {});
export const store = createStore(reduces , {}); 

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