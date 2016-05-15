
import React from 'react';
import ReactDom from "react-dom";

export default class XYLayoutReaclClass extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        let children = this.props.children;
        var ret = children.map((child, index) => {
            let style = {

            };
            var WrapComponent = child.ReactClass;
            return <WrapComponent key={index}></WrapComponent>;
        });
        return (<div>{ret}</div>);
    }
}
//这里可以设置在ReactClass中使用store
//XYLayoutReaclClass.contextTypes = Provider.childContextTypes;