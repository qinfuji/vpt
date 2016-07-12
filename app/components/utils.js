import {store} from '../store';
import {connect} from 'react-redux';

function Cache(cache){
    this._value = cache;
}

Cache.prototype.map = function(fn){
    var _self = this;
    return function(){
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(_self.__value);
        fn.apply(null , args);
    };
};

export const mapStateToProps =  function mapStateToProps(){
    let cache = {};
    return {
        register:function(type , factory){
            cache[type] = factory;
        },
        get:function(component){
            return (state) => cache[component.type](state[component.id]);
        }
    };
}();

export const mapDispatchToProps =  function mapDispatchToProps(){
    let cache = {};
    return {
        register:function(type , factory){
            cache[type] = factory;
        },
        get:function(component , context , store){
            return function(dispatch){
                var state = store.getState();
                return cache[component.type](context)(state[component.id]);
            };
        }
    };
}();



function factory(){
    let cache = {};
    return {
        register: function(type , obj){
            cache[type] = obj;
        },
        get: function(type){
            return cache[type];
        }
    };
}

export const reactClassFactory = factory();
export const componentFactory = factory();

export  const genId = function() {
    let id = 0;
    return function() {
        return ++id;
    };
}();

export function emptyFun() {};

export const defaultReduce = function(state , payload){
    return {...state , ...payload};
};

export const $component = function(id){
    let compState =  store.getState()[id];
    let component =  componentFactory.get(compState.type);
    return new component(compState);
};

export const $view = function(id , context){
    let component = $component(id);
    let ReactClass = reactClassFactory.get(component.type);
    return connect(mapStateToProps.get(component)
        ,mapDispatchToProps.get(component , context , store))(ReactClass);
};

export const $register = function (component, rcomponent, _mapStateToProps, _mapDispatchToProps) {
    mapStateToProps.register(component.prototype.type , _mapStateToProps);
    mapDispatchToProps.register(component.prototype.type , _mapDispatchToProps);
    reactClassFactory.register(component.prototype.type , rcomponent);
    componentFactory.register(component.prototype.type , component);
};