

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import {BorderLayout as BordLayoutModel} from '../lib/models/BorderLayout';
// import {BorderLayout as BordLayoutView} from '../lib/components/BorderLayout';
// let borderLayoutModel:BordLayoutModel = new BordLayoutModel();
// ReactDOM.render(<BordLayoutView model={borderLayoutModel}/>,document.getElementById("root"));

import { SplitPanel as SplitPanelModel, SplitPanelOrientation } from '../lib/models/SplitPanel';
import { SplitPanel as SplitPanelView } from '../lib/components/SplitPanel';

let splitPanelModel: SplitPanelModel = new SplitPanelModel();
splitPanelModel.width = 400;
splitPanelModel.height = 400;
splitPanelModel.dividerLoaction = .5;
splitPanelModel.orientation = SplitPanelOrientation.VERTICAL;
ReactDOM.render(<SplitPanelView model={splitPanelModel} />, document.getElementById("root"));