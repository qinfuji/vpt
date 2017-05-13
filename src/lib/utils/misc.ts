
import * as _ from 'lodash';

export function percentToNumber(percent:string|number){
    if(_.isNumber(percent)){
        return percent;
    }
    if(_.startsWith('%',percent,-1)){
        return parseInt(percent)
    }
    
    throw new Error("error imput param! expect a string end with % or a number");
}