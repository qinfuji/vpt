
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { Panel as PanelModel } from '../models/Panel';

@observer
export class Panel extends React.Component<{ model: PanelModel }, {}>{
    render() {
        
        let leftPanelStyle = {
            position: 'absolute',
            width: 10,
            left: 0,
            top: 0,
            buttom: 0
        }
        return <div></div>
    }
}