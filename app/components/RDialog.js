import React from 'react';
import styles from '../styles/dialog.less';

export default class RDialog extends React.Component {

    render() {
        let {width,height,title,dragable,show} = this.props;
        let style = {
            height:height,
            width:width
        };
        return (
            <div style={style}>
                <div className="modal-header">{title}
                    <span>X</span>
                </div>
                <div className="">Content</div>
            </div>
        );
    }
}