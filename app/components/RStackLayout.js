import React from 'react';
import {$view} from './utils';

export default class RStackLayout extends React.Component {

    genChildren(){
        let {children} = this.props;
        let {environment} = this.context;
        let ret = children.map(function(childId , index){
            //通过childId恢复对象
            let ViewComponent = $view(childId , environment);
            return <div key={index}><ViewComponent/></div>;
        });
        return ret;
    }

    render() {
        let {orientation} = this.props;
        return (
            <div>
               {this.genChildren()}
            </div>
        );
    }
}

RStackLayout.contextTypes = {
    environment:React.PropTypes.object
 }; 
