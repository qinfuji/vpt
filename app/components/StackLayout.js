import {createAction} from 'redux-act';
import Component , {bindProp}  from './Component';
import {bindAction ,bundle , selectState} from '../store';
import {mapStateToProps,mapDispatchToProps ,reactClassFactory, defaultReduce,componentFactory} from './utils';
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


mapStateToProps.register(StackLayout.prototype.type , _mapStateToProps);


const _mapDispatchToProps = context => state => {
    return {};
};

mapDispatchToProps.register(StackLayout.prototype.type , _mapDispatchToProps);
reactClassFactory.register(StackLayout.prototype.type , RStackLayout);
componentFactory.register(StackLayout.prototype.type , StackLayout);