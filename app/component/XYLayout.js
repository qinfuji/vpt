import Component from './Component';
import _ from 'lodash';
import XYLayoutReaclClass from '../react/composite/XYLayoutReaclClass';

export default class XYLayout extends Component {
    constructor() {
        super();
        this.children = [];
    };

    append(component, x, y) {
        x = x || 0;
        y = y || 0;
        this.children.push({
            x: x, y: y, component: component
        });
    }

    getState(storeContext) {
        let c = _.map(this.children, function (child) {
            return {
                x: child.x,
                y: child.y,
                ReactClass: child.component.getReactClass(storeContext)
            };
        });
        let state = { [this.id]: _.assign({}, super.getState(storeContext), { children: c }) };
        this.children.forEach(function (child) {
            state[child.component.id] = child.component.getState();
        });
        return state;
    };
};

XYLayout.prototype.type = "XYLayout";
XYLayout.prototype.ReactClass = XYLayoutReaclClass;