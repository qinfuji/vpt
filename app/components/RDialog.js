import React from 'react';
import styles from '../styles/dialog.less';
import {Motion, spring} from 'react-motion';
import classnames from 'classnames';
import {$view} from './utils';

const ZINDEX = 1100;

export default class RDialog extends React.Component {

    close(){
        let {close} = this.props;
        close();
    }

    open(){
        let {open} = this.props;
        open();
    }

    renderContent(id ,  context){
        return $view(id , context);
    }

    renderDialog(){
        let {dialogs,increase} = this.props;
        let _self = this;
        return dialogs.map(function(dialog , index){
            let {title , height=300 , width=696 , opacity=1 , context} = dialog['options'];
            let defaultStyle = {height:0,width:0,opacity:0};
            let style = {height:spring(height),width:spring(width),opacity:spring(opacity)};
            let WrapedContent = _self.renderContent(dialog.id , context);
            return (
                <Motion defaultStyle={defaultStyle} style={style} key={index}>
                  {(value)=>
                      <div  className={classnames("dialog-inner")} style={{zIndex: ZINDEX + index}}>
                        <div className={classnames("dialog")} style={value}>{title}
                            <button onClick={_self.open.bind(_self)}>打开</button>
                            <button onClick={_self.close.bind(_self)}>关闭</button>
                            <WrapedContent/>
                        </div>
                      </div>
                  }
                </Motion>
            );
        });
    }

    render() {
        let {dialogs} = this.props;
        let dlen = dialogs.length;
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

