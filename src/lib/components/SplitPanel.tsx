
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import { SplitPanel as SplitPanelModel, SplitPanelOrientation } from '../models/SplitPanel';
import { CssProperties } from '../models/CssProperties';
import { $View } from '../ViewFactory';
import './styles/splitPanel.css';

@observer
export class SplitPanel extends React.Component<{ model: SplitPanelModel }, {}>{

    percenToNumber(percen: string) {
        return parseInt(percen) / 100;
    }

    render() {
        let dividerLoaction = this.props.model.dividerLoaction;
        let model = this.props.model;
        let { parent } = model;
        let dividerSize = model.dividerSize;
        let parentWidth = parent ? parent.width : model.width;
        let parentHeight = parent ? parent.height : model.height;
        let splitpanelStyle = {
            width: parentWidth,
            height: parentHeight
        }
        if (this.props.model.orientation === SplitPanelOrientation.HORIZONTAL) {

            let leftWidth = 0;
            if (_.isString(dividerLoaction)) {
                leftWidth = parentWidth * this.percenToNumber(dividerLoaction) - dividerSize / 2;
            } else {
                leftWidth = dividerLoaction;
            }

            let rightWidth = parentWidth - leftWidth - dividerSize;
            let leftPanelStyle = {
                position: 'absolute',
                width: leftWidth,
                left: 0,
                top: 0,
                bottom: 0
            } as React.CSSProperties;
            let rightPanelStyle = {
                width: rightWidth,
                right: 0,
                top: 0,
                bottom: 0,
                position: 'absolute'
            } as React.CSSProperties;
            let dividerStyle = {
                width: dividerSize,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: leftWidth
            } as React.CSSProperties;
            let first = model.first;
            first.position = "absolute";
            first.width = leftWidth;
            console.log(Object.keys(first as CssProperties));
            console.log("---->", Object.getOwnPropertyNames(first));
            let FirstView = $View(model.first);
            React.createElement(FirstView, { model: model.first });
            return <div className="splitpanel" style={splitpanelStyle}>
                <div style={leftPanelStyle}></div>
                <div className="divider" style={dividerStyle}></div>
                <div style={rightPanelStyle}></div>
            </div>
        } else {

            let topHeight = 0;
            if (_.isString(dividerLoaction)) {
                topHeight = parentHeight * this.percenToNumber(dividerLoaction) + dividerSize
            } else {
                topHeight = dividerLoaction;
            }

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