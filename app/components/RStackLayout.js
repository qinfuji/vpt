import React from 'react';
import {$view} from './utils';

export default class RStackLayout extends React.Component {

    genChildren(){
        let {children , context} = this.props;
        let ret = children.map(function(childId , index){
            //通过childId恢复对象
            let ViewComponent = $view(childId , context);
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

