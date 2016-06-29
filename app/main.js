import ReactDom from "react-dom";
import React from 'react';
import Button from './components/Button';
import RButton from './components/RButton';
import {connect, Provider} from 'react-redux';
var R = require('ramda');
import {mapStateToProps,mapDispatchToProps} from './components/utils';
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
  btn1.setLabel("AAAA");
  btn1.onClick('btn_onClick');
  
  let btn2 = new Button();
  btn2.setLabel("AAAA");
  btn2.onClick('btn_onClick');


  this.btn_onClick = function(){
      
      console.log(btn1);
      console.log('page in btn_Onckick');
      btn1.setLabel('Onclkikc');
      console.log(store.getState());
  };

  this.render = function(){
      var ButtonWraped = connect(mapStateToProps.get(btn1.type)(btn1)
       ,mapDispatchToProps.get(btn1.type)(btn1))(RButton);
       var ButtonWraped2 = connect(mapStateToProps.get(btn2.type)(btn2)
       ,mapDispatchToProps.get(btn2.type)(btn2))(RButton);
      ReactDom.render(<Provider store={store}><div><ButtonWraped></ButtonWraped>
                      <ButtonWraped2></ButtonWraped2></div></Provider>, 
      document.getElementById("root"));
  };
}

let page = new Page();

page.render();