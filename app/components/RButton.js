import React from 'react';
import styles from '../styles/button.less';
export default class RButton extends React.Component {

    clickHandle(e){
        this.props.onClick(e);
    }

    render() {
        console.log(this.props);
        return (
            <button className={styles.button} onClick={this.clickHandle.bind(this) }>
                {this.props.label}
            </button>
        );
    }
}

