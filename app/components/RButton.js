import React from 'react';
import styles from '../styles/button.less';
import classnames from 'classnames';

export default class RButton extends React.Component {

    componentWillUnmount(){
        let {remove , id} = this.props;
        remove(id);
    }

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