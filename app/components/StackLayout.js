import {createAction} from 'redux-act';
import Component , {bindProp}  from './Component';
import {bindAction ,bundle} from '../store';
import {defaultReduce,$register} from './utils';
import R from 'ramda';
import RStackLayout from './RStackLayout';


export const StackOrientation = {
    Horizontal:'H' , Vertical:'V'
};

const _initData = {
    orientation : StackOrientation.Horizontal,
    children : []
};

export default function StackLayout(initData = {..._initData}){
    Component.apply(this, [initData]);
}


const appendAction = createAction('append' , function(id , component){
    return {
        id , componentId:component.id
    };
});
const appendReduce = function(state , payload){
    let childId = payload.componentId;
    let children = state.children;
    return {...state , children:R.append(childId,children)};
};
bundle(appendAction , appendReduce);

const setOrientationAction = createAction('setOrientation' , (id , orientation)=>({id , orientation}));
bundle(setOrientationAction , defaultReduce);

StackLayout.prototype.constructor = StackLayout;
StackLayout.prototype = Object.create(Component.prototype);


StackLayout.prototype.append = bindAction(appendAction);
StackLayout.prototype.type = "StackLayout";


const _mapStateToProps = (state)=>({
        orientation : state['orientation'],
        children: state['children']
    });



const _mapDispatchToProps = (stackLayout , context , state) => {
    return {};
};


$register(StackLayout,RStackLayout,_mapStateToProps,_mapDispatchToProps);