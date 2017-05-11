
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { SplitPanel as SplitPanelModel, SplitPanelOrientation } from '../models/SplitPanel';
import './styles/splitPanel.css';

@observer
export class SplitPanel extends React.Component<{ model: SplitPanelModel }, {}>{

    render() {
        let dividerLoaction = this.props.model.dividerLoaction;
        let { parent } = this.props.model;
        let dividerSize = this.props.model.dividerSize;
        let parentWidth = parent ? parent.width : this.props.model.width;
        let parentHeight = parent ? parent.height : this.props.model.height;
        let splitpanelStyle = {
            width: parentWidth,
            height: parentHeight
        }
        if (this.props.model.orientation === SplitPanelOrientation.HORIZONTAL) {
            let leftWidth = parentWidth * dividerLoaction - dividerSize / 2;
            let rightWidth = parentWidth - leftWidth - dividerSize;
            let leftPanelStyle = {
                position: 'absolute',
                width: leftWidth,
                left: 0,
                top: 0,
                buttom: 0
            } as React.CSSProperties;
            let rightPanelStyle = {
                width: rightWidth,
                right: 0,
                top: 0,
                buttom: 0,
                position: 'absolute'
            } as React.CSSProperties;
            let dividerStyle = {
                width: dividerSize,
                position: 'absolute',
                top: 0,
                buttom: 0,
                left: leftWidth
            } as React.CSSProperties;
            return <div className="splitpanel" style={splitpanelStyle}>
                <div style={leftPanelStyle}></div>
                <div className="divider" style={{ dividerStyle }}></div>
                <div style={rightPanelStyle}></div>
            </div>
        } else {
            let topHeight = parentHeight * dividerLoaction + dividerSize
            let bottomHeight = parentHeight - topHeight - dividerSize;

            let topStyle = {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: topHeight
            } as React.CSSProperties;
            let bottomStyle = {
                height: bottomHeight,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute'
            } as React.CSSProperties;

            let dividerStyle = {
                position: 'absolute',
                height: dividerSize,
                left: 0,
                right: 0,
                top: topHeight
            } as React.CSSProperties;

            return <div className="splitpanel" style={splitpanelStyle}>
                <div style={topStyle}></div>
                <div className="divider" style={dividerStyle}></div>
                <div style={bottomStyle}></div>
            </div>
        }
    }
}