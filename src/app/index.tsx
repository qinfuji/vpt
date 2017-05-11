

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {toJS} from 'mobx';
let Utils = require('Utils');
// import {BorderLayout as BordLayoutModel} from '../lib/models/BorderLayout';
// import {BorderLayout as BordLayoutView} from '../lib/components/BorderLayout';
// let borderLayoutModel:BordLayoutModel = new BordLayoutModel();
// ReactDOM.render(<BordLayoutView model={borderLayoutModel}/>,document.getElementById("root"));

import { SplitPanel as SplitPanelModel, SplitPanelOrientation } from '../lib/models/SplitPanel';
import { SplitPanel as SplitPanelView } from '../lib/components/SplitPanel';

let splitPanelModel: SplitPanelModel = new SplitPanelModel();
let root: HTMLElement = document.getElementById("root");
let clientRect = Utils.DOM.getBoundingClientRect(root);
splitPanelModel.width = clientRect.width;
splitPanelModel.height = clientRect.height;
splitPanelModel.dividerLoaction = .2;
splitPanelModel.dividerSize = 5;
splitPanelModel.orientation = SplitPanelOrientation.VERTICAL;
ReactDOM.render(<SplitPanelView model={splitPanelModel} />, root);


window.addEventListener('resize', function () {
    let clientRect = Utils.DOM.getBoundingClientRect(root);
    splitPanelModel.width = clientRect.width;
    splitPanelModel.height = clientRect.height;
    console.log(toJS(splitPanelModel));
});  