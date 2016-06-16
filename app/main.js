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



const setChildren = createAction('setChildren', children => children);
const initData = {};

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
var mergeStoreAction = createAction("mergeStoreAction" , store=>store);

function mergeStore(targetStore , attachStore) {
    return _store.subscribe(function() {
        var chlidren = _store.getState();
        setChildren(chlidren);
    });
}

const setId = createAction('setId', id => id);
function Component(initData = {} , store){
    if(store){
       this.store = store;
       return;
    }
    this.handlers = {};
    let reduce = createReducer(this.handlers, initData);
    this.handlers[setId] = (state, id) => ({...state, id: id });
    this.store = createStore(reduce, initData);
    this.setId(this.type+"_"+genId());
}
Component.prototype.setParent = function(parent){
    parent.mergeChild(this.store.getState());
    this.store.subscribe(()=>{
       parent.mergeChild(this.store.getState());
    });
};
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

const mergeChild = createAction("mergeChild" , child=>child);
function Container(initData = {children:{}} , store){
   Component.apply(this, arguments);
}
Container.prototype.constructor = Container;
Container.prototype = Object.create(Component.prototype);
Container.prototype.mergeChild = wrapAction(mergeChild , (state , child)=>({
    ...state , children:{...state.children , [child.id]:child}
}));
Container.prototype.findChild = function(id){
   //查询子
};
Container.prototype.type = "Container";

var btn1 = new Button({
    label: "InitLabel"
});
btn1.setLabel("labelhj");
console.log(btn1.store.getState());
console.log(btn1.getLabel());
var container = new Container();
console.log(container.store.getState());
btn1.setParent(container);
console.log(container.store.getState());

btn1.setLabel("aaaaaa");
console.log(btn1.store.getState());
console.log(container.store.getState());
// var btn2 = new Button();
// btn2.setLabel("label2");


// var btn3 = new Button(btn1.store.getState() , btn1.store);

// console.log(btn1.store.getState());
// console.log(btn2.store.getState());
// console.log(btn3.store.getState());

// console.log(btn3.store == btn1.store);

// btn1.setLabel("label4");
// //btn1.setId(1);
// console.log(btn1.store.getState());
// console.log(btn2.store.getState());
// console.log(btn3.store.getState());



// console.log(container.store.getState());

// btn1.setLabel("aaaaa");
// console.log(container.store.getState());