import React from 'react';
import styles from '../styles/dialog.less';
import {Motion, spring} from 'react-motion';

export default class RDialog extends React.Component {

    close(){
        
    }

    render() {
        let {width,height,title,dragable,show} = this.props;
        let style = {
            height:height,
            width:width
        };
        
        return (
            <Motion defaultStyle={{x:0}} style={{x:spring(10)}}>
               {value=>(
                <div style={style}>
                    <div className="modal-header">{title}
                        <span onClick={this.close.bind(this)}>X</span>
                    </div>
                    <div className="">Content</div>
                </div>)
               }
            </Motion>
        );
    }
}