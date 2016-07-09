import ReactDom from "react-dom";
import React from 'react';
import Button from './components/Button';
import RButton from './components/RButton';
import StackLayout from './components/StackLayout';
import RStackLayout from './components/RStackLayout';
import {connect, Provider} from 'react-redux';
var R = require('ramda');
import {mapStateToProps,mapDispatchToProps, $view} from './components/utils';
import {store} from './store';

Provider.childContextTypes = {
   ...Provider.childContextTypes ,
   environment : React.PropTypes.object
};

function Page(){

  var _self = this;
  Provider.prototype.getChildContext = function() {
    return { 
        store: this.store,
        environment : _self
    };
  };

  let btn1 = new Button();
  btn1.onClick('btn_onClick');
  
  let btn2 = new Button();
  btn2.onClick('btn_onClick');


  let stackLayout = new StackLayout();
  stackLayout.append(btn1);
  stackLayout.append(btn2);

  this.btn_onClick = function(){
      btn1.setLabel("My onClick");
  };


  this.render = function(){
     let StackLayoutWraped = $view(stackLayout.id , this);
     ReactDom.render(<Provider store={store}>
                       <StackLayoutWraped/>
                      </Provider>,  document.getElementById("root"));
  };
}

let page = new Page();

page.render();