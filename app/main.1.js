import { createStore, combineReducers, compose } from 'redux';
import { createAction, createReducer } from 'redux-act';

// const multipleAction = createAction("aaa", (text, checked) => ({ text, checked }));
// const multipleAction1 = createAction("aaa", (text, checked) => ({ text, checked }));
// console.log(multipleAction(1, 2));

// console.log(multipleAction1(1, 2));

// const serializableAction = createAction('SERIALIZABLE_ACTION');

// console.log(serializableAction());


const btnInit = {
    label:'Button'
};

function Button(initData=initData) {
    const setLabel = createAction('setLabel');
    const setWidth = createAction('setWidth');
    const id = 'btn100';
    const handlers = {};
    const _reduce = createReducer({
        [setLabel]: (state, label) => {
            let mystate = state[id] || {};
            mystate.label = label;
            return Object.assign({}, state, { [id]: mystate });
        },
        [setWidth]: (state, width) => {
            let mystate = state[id] || {};
            mystate.width = width;
            return Object.assign({}, state, { [id]: mystate });
        }
    });
    let _store = createStore(_reduce, { [id]: {} }, window.devToolsExtension ? window.devToolsExtension() : f => f);
    setLabel.assignTo(_store);
    setWidth.assignTo(_store);
    return {
        set label(label) {
            setLabel(label);
        },
        set width(width) {
            setWidth(width);
        },
        get store() {
            return _store;
        },

        get id() {
            return id;
        },
        
        set parent(parent){
            
        },
        
        get state() {
            return _store.getState();
        },
        // set store(store) {
        //     //这里需要合并
        //     setLabel.assignTo(store);
        //     setWidth.assignTo(store);
        //     setLabel(_store.getState()[id].label);
        //     setWidth(_store.getState()[id].width);
        //     _store = store;
        // },
        
        set context(context){
            context.merge(_store);
        },

        getReduces: function () {
            return _reduce;
        }
    };
}


function XYLayout() {
    const append = createAction('append');
    const id = 'btn100';
    const _reduce = createReducer({
        [append]: (state, component) => {
            let mystate = state[id] || {};
            component.store = _store;
            mystate[component.id] = { x: component.x, y: component.y };
            return Object.assign({}, state, { [id]: mystate });
        }
    });

    let _store = createStore(_reduce, { [id]: {} }, window.devToolsExtension ? window.devToolsExtension() : f => f);
    append.assignTo(_store);
    return {
        get store() {
            return _store;
        },
        append,
        get id() {
            return id;
        },
        get state() {
            return _store.getState();
        },
        set store(store) {
            //这里需要合并
            append.assignTo(store);
            setLabel(_store.getState()[id]);
            setWidth(_store.getState()[id]);
            _store = store;
        },

        getReduces: function () {
            return _reduce;
        }
    };
}


var btn = new Button();
btn.label = 'aaa';
btn.width = 20;

//var b = combineReducers({a:btn.getReduces()},{});
//var xyLayout = new XYLayout();
//xyLayout.append(btn, 10, 19);

// const id = 'g001';
// const _store = createStore(b, {}, window.devToolsExtension ? window.devToolsExtension() : f => f);
// btn.store = _store;

console.log(btn.state);