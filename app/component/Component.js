import _ from 'lodash';
import {connect} from 'react-redux';

export default class Component {

    constructor() {
        this._id = _.uniqueId(this.type + "_");
        this.listeners = [];
    }

    get id() {
        return this._id;
    }

    getState() {
        return {
            id: this._id,
            type: this.type
        };
    }

    addListener(listener) {
        this.listeners.push(listener);
        return () => {
            var index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    }

    update(type, payload) {
        this.listeners.slice().forEach(listener => listener({
            type: type || "CHANGE_DATA",
            payload: payload || this.getState()
        }));
    }

    // get parent() {
    //     return this._parent;
    // }

    // set parent(parent) {
    //     this._parent = parent;
    // }


    // get context() {
    //     var context = null;
    //     if(this.parent){
    //         context = this.parent.context;
    //     }
    //     if(!context){
    //         //
    //     }
    //     return context;
    // }

    getReactClass(storeContext) {
        storeContext.bind(this);
        var _self = this;
        var actions = _.reduce(_.functionsIn(this), function (result, v) {
            result[v.substring(1)] = _self[v].bind(_self);
            return result;
        }, {});
        function mapStateToProps(component) {
            return function (state) {
                return _.assign({}, state[component.id], actions);
            };
        }
        return connect(mapStateToProps(this))(this.ReactClass);
    }

}