import React from 'react';

export default class RButton extends React.Component {

    clickHandle(e){
        this.props.onClick(e , this.context.environment);
    }

    render() {
        return (
            <button onClick={this.clickHandle.bind(this) }>
                {this.props.label}
            </button>
        );
    }
}


RButton.contextTypes = {
   environment:React.PropTypes.object
};