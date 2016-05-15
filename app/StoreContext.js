import _ from 'lodash';
import {createStore} from 'redux';

var StoreContext = (function () {

    let _store = null;
    class StoreContext {

        constructor(initState = {}) {
            _store = createStore(this.setState.bind(this), initState);
        }

        subscribe(listener) {
            return this.store.subscribe(listener);
        }

        bind(component) {
            component.addListener(this.update.bind(this));
        }

        get store() {
            return _store;
        }

        setState(state, action) {
            if (action.type == 'INIT_STATE') {
                return action.payload;
            } else if (action.type == "CHANGE_DATA") {
                return _.assign({}, state, { [action.payload.id]: action.payload });
            } else if (action.type == "REMOVE_COMPONENT") {
                let id = action.payload.id;
                let _state = _.assign({}, state);
                delete _state[id];
                return _state;
            }
            return state;
        }

        update(action) {
            this.store.dispatch(action);
        }
    }
    return StoreContext;
})();

export default StoreContext;