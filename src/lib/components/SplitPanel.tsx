import * as React from 'react';
import { observer } from 'mobx-react';
import { SplitPanel as SplitPanelModel, SplitPanelOrientation } from '../models/SplitPanel';
import * as styles from './styles/splitPanel.css';

@observer
export class SplitPanle extends React.Component<{ model: SplitPanelModel }, {}>{

    render() {
        if (this.props.model.orientation === SplitPanelOrientation.HORIZONTAL) {
            let leftStyle = {
                width: "20%",
            };
            let rightStyle = {
                width: "80%",
            }
            return <div className="horizontal">
                <div style={leftStyle}></div>
                <div style={rightStyle}></div>
            </div>
        } else {
            let topStyle = {
                height: "20%",
            };
            let bottomStyle = {
                height: "80%",
            }
            return <div className="vertical">
                <div style={topStyle}></div>
                <div style={bottomStyle}></div>
            </div>
        }
    }
}