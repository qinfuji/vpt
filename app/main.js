import ReactDom from "react-dom";
import React from 'react';

import Button from './components/Button';
import RButton from './components/RButton';
import StackLayout from './components/StackLayout';
import RStackLayout from './components/RStackLayout';

import Dialog from './components/Dialog';
import RDialog from './components/RDialog';

import {Provider} from 'react-redux';
var R = require('ramda');
import {$view} from './components/utils';
import {store} from './store';
import Component from './components/Component';

let dialog = new Dialog();


class Customer{
   setRoot(root){
     this.root = root;
   }
}


class Page1 extends Customer{

  constructor(){
    super();
    let btn1 = new Button({ label: "弹出对话框" });
    btn1.onClick('btn_onClick');

    let btn2 = new Button({ label: "弹出对话框" });
    btn2.onClick('btn_onClick');

    this.stackLayout = new StackLayout();
    this.stackLayout.append(btn1);
    this.stackLayout.append(btn2);
    this.setRoot(this.stackLayout);
  }

  

  btn_onClick() {
     alert('ok');
  };
}

class Page extends Customer{

  constructor(){
    super();
    let btn1 = new Button({ label: "弹出对话框" });
    btn1.onClick('btn_onClick');

    let btn2 = new Button({ label: "弹出对话框" });
    btn2.onClick('btn_onClick');

    this.stackLayout = new StackLayout();
    this.stackLayout.append(btn1);
    this.stackLayout.append(btn2);
    this.setRoot(this.stackLayout);
  }

  

  btn_onClick() {
    let _page = new Page();
    let  root = page.root;
    dialog.open(root.id, { title: "测试 Page", width: 500, height: 500 ,context:_page});
  };

  
}

let page = new Page();
let root = page.root;
console.log(page instanceof Customer);

let StackLayoutWraped = $view(root.id , page);
ReactDom.render(<Provider store={store}>
                       <StackLayoutWraped/>
                      </Provider>,  document.getElementById("root"));

console.log(store.getState());
