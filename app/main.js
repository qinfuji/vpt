import {
    createStore,
    combineReducers,
    compose
} from 'redux';
import {
    createAction,
    createReducer,
    assignAll
} from 'redux-act';


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

function bundleAction(component , action , reduce){
    component.handlers[action] = reduce;
    action.assignTo(component.store);
}


/**
 * 所有组件的基类
 * @param store
 * @param initData
 */
function Component(store, initData = {} , isRef=false) {
    this.store = store;
    this.handlers = {};
    let setId = createAction('setId', id => id);

    this.bundleAction(setId , (state, id) => ({...state,id: id}));
    initData.type = this.type;
    let reduce = createReducer(this.handlers, initData);
    if (!initData.id) { //如果id没有创建则需要构造reduce
        initData.id = this.type + "_" + genId();
        injectAsyncReducer(store, initData.id, reduce);
        setId(initData.id);
    }

    this.getId = function(){
        return initData.id;
    };
}

Component.prototype.map = function(f){
    let state = this.store.getState()[this.getId()];
    return f(state);
};

Component.prototype.bundleAction = function(action , reduce){
    this.handlers[action] = reduce;
    action.assignTo(this.store);
};



function Button(store ,initData = {}) {
    Component.apply(this, arguments);
    const setLabel = createAction('setLabel', label => label);
    this.bundleAction(setLabel , (state, label) => ({...state,label: label}));
    let _self = this;

    return {
        get label(){
            return _self.map(function(state){
                return state.label;
            });
        },
        set label(label){
            setLabel(label);
        }
    };
}
Button.prototype.constructor = Button;
Button.prototype = Object.create(Component.prototype);
Button.prototype.onClick = emptyFun;
Button.prototype.type = "Button";


const store = configureStore({});
const btn = new Button(store);
btn.label = "Btn1";
btn.onClick = function() {
    btn1.label = ("onClick set Label");
};

console.log(btn.label);

const btn1 = new Button(store);
console.log(store.getState());
const btn2 = new Button(store);
const btn3 = new Button(store);
btn.onClick();
console.log(store.getState());
btn.label = ("aaaa");

console.log(store.getState());

const btn4 = new Button(store , store.getState()['Button_2']);
btn4.label = "AAAAAA";
console.log(store.getState());