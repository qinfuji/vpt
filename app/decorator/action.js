
export default (target, name, descriptor) => {
    if (descriptor.set) {
        let set = descriptor.set;
        descriptor.set = function () {
            var args = Array.prototype.slice.call(arguments);
            set.apply(this, args);
            this.update();
        };
        return descriptor;
    } else if (descriptor.value) {
        target['_' + name] = function () {
            var args = Array.prototype.slice.call(arguments);
            this[name].apply(this, args);
            this.update();
        };
    }
    return descriptor;
};