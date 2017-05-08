
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import DomUtils from 'Utils';
import { SplitPanel as SplitPanelModel, SplitPanelOrientation } from '../models/SplitPanel';
import * as styles from './styles/splitPanel.css';

@observer
export class SplitPanle extends React.Component<{ model: SplitPanelModel }, {}>{

    getParentEle(){
        let curEle:Element = ReactDOM.findDOMNode(this);
        let parentEle = curEle.parentElement;
        let rect =  DomUtils.DOM.getBoundingClientRect(parentEle);
        return rect;
    }

    render() {
        let dividerLoaction = this.props.model.dividerLoaction;
        let dividerSize = this.props.model.dividerSize;
        let parentWidth = this.getParentEle().width;
        if (this.props.model.orientation === SplitPanelOrientation.HORIZONTAL) {
            let leftWidth = parentWidth * dividerLoaction - dividerSize/2;
            let rightWidth = parentWidth - leftWidth - dividerSize;
            let leftPanelStyle = {
                position:"abstract",
                width: leftWidth,
                left:0,
                top:0,
                buttom:0
            };
            let rightPanelStyle = {
                width: rightWidth,
                right:0,
                top:0,
                buttom:0,
                position:"abstract"
            }
            let dividerStyle = {
                width: dividerSize,
                position:'abstract',
                top:0,buttom:0,
                left:leftPanelStyle
            };
            return <div className="splitpanel horizontal">
                <div style={leftPanelStyle}></div>
                <div className="divide" style={dividerStyle}></div>
                <div style={rightPanelStyle}></div>
            </div>
        } else {
            let topStyle = {
                height: "20%",
            };
            let bottomStyle = {
                height: "80%",
            }
            let divideWidth = {
                width: dividerSize
            }
            return <div className="splitpanel vertical">
                <div style={topStyle}></div>
                <div className="divide" style={divideWidth}></div>
                <div style={bottomStyle}></div>
            </div>
        }
    }
}