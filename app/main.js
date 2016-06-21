import {createStore,combineReducers,compose} from 'redux';
import {createAction,createReducer,assignAll} from 'redux-act';


function _createReducer(asyncReducers) {
  return combineReducers({
    ...asyncReducers
  });
}

function configureStore(initialState) {
  let store = createStore(_createReducer(), initialState);
  store.asyncReducers = {};
  return store;
}

function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(_createReducer(store.asyncReducers));
}

const emptyFun = function() {};

const genId = function() {
    let id = 1;
    return function() {
        return ++id;
    };
}();

function wrapAction(action , reduce) {
    return function() {
        var args = Array.prototype.slice.call(arguments);
        this.handlers[action] = reduce;
        action.assignTo(this.store);
        action.apply(action, args);
    };
}

const setId = createAction('setId', id => id);
function Component(store ,initData = {}){
    this.store = store;
    this.handlers = {};
    let reduce = createReducer(this.handlers, initData);
    this.handlers[setId] = (state, id) => ({...state, id: id });
    if(!initData.id){
       initData.id = this.type+"_"+genId();
    }
    injectAsyncReducer(store , initData.id , reduce);
    this.setId(initData.id);
}
Component.prototype.setId = wrapAction(setId , (state, id) => ({...state, id: id }));


const setLabel = createAction('setLabel', label => label);
function Button(initData = initData , store) {
   Component.apply(this, arguments);
}
Button.prototype.constructor = Button;
Button.prototype = Object.create(Component.prototype);
Button.prototype.setLabel = wrapAction(setLabel , (state , label)=>({...state , label:label}));
Button.prototype.onClick = emptyFun;
Button.prototype.type = "Button";
Button.prototype.getLabel = function(){
   return this.store.getState().label;
};


const store = configureStore({});
const btn = new Button(store);
btn.onClick = function(){
    btn1.setLabel("onClick set Label");
};

const btn1 = new Button(store);
console.log(store.getState());
//const btn2 = new Button(store);
//const btn3 = new Button(store);
//btn.onClick();
console.log(store.getState());
//btn.setLabel("aaaa");
