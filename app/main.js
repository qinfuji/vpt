import ReactDom from "react-dom";
import React from 'react';
import {createStore,combineReducers,compose} from 'redux';
import {createAction,createReducer,assignAll} from 'redux-act';
import {connect, Provider} from 'react-redux';
var R = require('ramda');

Provider.childContextTypes = {
   ...Provider.childContextTypes ,
   onClick : React.PropTypes.func
};

Provider.prototype.getChildContext = function() {
    return { 
        store: this.store ,
        onClick : function(){console.log("-----");}
    };
  };

const handlers = {};
let reduces = createReducer(handlers, {});
const store = createStore(reduces , {}); 

function bundle(action , reduce){
    handlers[action] = function(state , payload){
        var id = payload.id;
        var _state = state[id] || {};
        var ret = reduce(_state , payload);
        return {...state , [id]:ret};
    };
    action.assignTo(store);
}

const genId = function() {
    let id = 0;
    return function() {
        return ++id;
    };
}();

const emptyFun = function() {};

function bindAction(action){
    return function () {
        let id = this.id;
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(id);
        action.apply(null, args);
    };
}

const setId = createAction('setId',id=>({id}));
bundle(setId , function(state , payload){
    return {...state , ...payload};
});
function Component(id){
    this.id = id || this.type+"_"+genId();
    if(!id){
        setId(this.id , this.id);
    }
}

const setLabel = createAction('setLabel',(id ,label)=>({id ,label}));
bundle(setLabel , (state , payload) =>({...state , ...payload}));

const onClick = createAction('onClick' , (id , fnName)=>({id , fnName}));
bundle(onClick , (state , payload) =>({...state , ...payload}));

function Button(){
    Component.apply(this, arguments);
}
Button.prototype.constructor = Button;
Button.prototype = Object.create(Component.prototype);
Button.prototype.onClick = emptyFun;
Button.prototype.type = "Button";
Button.prototype.setLabel = bindAction(setLabel);

 const mapStateToProps = function(button){
    return (state)=>({
        label : state[button.id].label
    });
};

const mapDispatchToProps = button => diapatch => {
    return {
        onClick : function(e , context){
            //这里获取事件的配置
            let eventName = "";
            if(eventName){
                content[eventName].apply(content , e);
            }
        }
    };
};



class RButton extends React.Component {

    clickHandle(e){
        console.log(this.context);
        this.props.onClick(e , this.context.onClick);
    }

    render() {
        return (
            <button onClick={this.clickHandle.bind(this) }>
                {this.props.label}
            </button>
        );
    }
}

RButton.contextTypes = {
   onClick: React.PropTypes.func
};


let btn1 = new Button();

var ButtonWraped = connect(mapStateToProps(btn1),mapDispatchToProps(btn1))(RButton);
ReactDom.render(<Provider store={store}><ButtonWraped></ButtonWraped></Provider>, 
document.getElementById("root"));

// ReactDom.render(<Container><RButton></RButton></Container>, 
//    document.getElementById("root"));


btn1.setLabel("AAAA");