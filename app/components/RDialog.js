import React from 'react';
import styles from '../styles/dialog.less';
import {Motion, spring} from 'react-motion';

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

    render() {
        console.log("Dialog render" , this.props);
        let {dialogs} = this.props;
        console.log(dialogs);
        return <div></div>;
        // let defaultStyle = {height:0,width:0,opacity:0};
        // let style = {height:spring(height),width:spring(width),opacity:spring(1)};
        // return (
        //     <Motion defaultStyle={defaultStyle} style={style}>
        //        {value=>(
        //         <div style={this.genStyle(value)} className={styles.dialog}>
        //             <div className="modal-header">{title}
        //                 <span onClick={this.close.bind(this)}>X</span>
        //             </div>
        //             <div className="">Content</div>
        //         </div>
        //         )}
        //     </Motion>
        // );
    }
}

