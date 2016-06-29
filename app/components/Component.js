
import {createAction} from 'redux-act';
import {bindAction , genId} from './utils';
import {bundle} from '../store';

const setId = createAction('setId',id=>({id}));
bundle(setId , function(state , payload){
    return {...state , ...payload};
});

export default function Component(store , id){
    this.id = id || this.type+"_"+genId();
    if(!id){
        setId(this.id , this.id);
    }
}