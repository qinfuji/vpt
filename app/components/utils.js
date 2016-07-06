
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