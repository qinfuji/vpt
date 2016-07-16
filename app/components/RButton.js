import React from 'react';
import styles from '../styles/button.less';
import classnames from 'classnames';

export default class RButton extends React.Component {

    clickHandle(e){
        this.props.onClick(e);
    }

    render() {
        let className = classnames('button');
        return (
            <button className={className} onClick={this.clickHandle.bind(this) }>
                {this.props.label}
            </button>
        );
    }
}

RButton.contextTypes = {
    environment:React.PropTypes.object
 }; 