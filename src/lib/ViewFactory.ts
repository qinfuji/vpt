

import {Panel as PanelView} from './components/Panel';

let ModelViewMap ={
    'Panel' :  PanelView
};

export function $View(model){
    return ModelViewMap.Panel;
}