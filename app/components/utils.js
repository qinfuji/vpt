export function bindAction(action){
    return function () {
        let id = this.id;
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(id);
        action.apply(null, args);
    };
}


export const mapStateToProps =  function mapStateToProps(){
    let cache = {};
    return {
        register:function(type , factory){
            cache[type] = factory;
        },
        get:function(type){
            return cache[type];
        }
    };
}();

export const mapDispatchToProps =  function mapDispatchToProps(){
    let cache = {};
    return {
        register:function(type , factory){
            console.log(type)
            cache[type] = factory;
        },
        get:function(type){
            return cache[type];
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