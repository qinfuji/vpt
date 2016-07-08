import React from 'react';

export default class RButton extends React.Component {

    clickHandle(e){
        this.props.onClick(e);
    }

    render() {
        console.log(this.props);
        return (
            <button onClick={this.clickHandle.bind(this) }>
                {this.props.label}
            </button>
        );
    }
}