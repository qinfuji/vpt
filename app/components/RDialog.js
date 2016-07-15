import React from 'react';
import styles from '../styles/dialog.less';
import {Motion, spring} from 'react-motion';
import classnames from 'classnames';

const ZINDEX = 1100;

export default class RDialog extends React.Component {

    close(){
        
    }

    genStyle(motionValue){
    //    return {
    //         height:motionValue.height,
    //         width:motionValue.width,
    //         "backgroundColor":"#eeeeee",
    //         opacity:motionValue.opacity
    //     };
    }

    renderDialog(){
        let {dialogs} = this.props;
        let keys = Object.keys(dialogs);
        return keys.map(function(id , index){
            let dialogOpts = dialogs[id];
            let defaultStyle = {height:0,width:0,opacity:0};
            let style = {height:spring(300),width:spring(796),opacity:spring(1)};
            return (
                <Motion defaultStyle={defaultStyle} style={style}>
                  {(value)=>
                      <div key={id} className={classnames("dialog-inner")} style={{zIndex: ZINDEX + index}}>
                        <div className={classnames("dialog")} style={value}>sssss</div>
                      </div>
                  }
                </Motion>
            );
        });
    }

    render() {
        let {dialogs} = this.props;
        let dlen = Object.keys(dialogs).length;
        let className = classnames(
            'dialog-container' ,  { active: dlen > 0 }
        );
        return (
            <div className={className}>
              <div className={classnames("dialog-overlay")} style={{zIndex:ZINDEX + dlen - 1}}></div>
                {this.renderDialog()}
            </div>
        );
    }
}

