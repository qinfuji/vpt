export  function genId() {
    let id = 0;
    return function() {
        return ++id;
    };
};

export function emptyFun() {};