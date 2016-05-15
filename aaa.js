'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _desc, _value, _class;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Button = require('./react/component/Button');

var _Button2 = _interopRequireDefault(_Button);

require('babel-polyfill');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Action(target, name, descriptor) {
    //console.log( 'Decorator Action' , target[name] , descriptor)
    // descriptor.enumerable = true;
    // var fn = descriptor.value;
    // descriptor.value = function () {
    //     var args = Array.prototype.slice.call(arguments);
    //     fn.apply(this, args);
    //     target.update.apply(this);
    // }
    // return descriptor;

    //var fn = descriptor.value;
    target['_' + name] = function () {
        var args = Array.prototype.slice.call(arguments);
        this[name].apply(this, args);
        this.update();
    };
    return descriptor;
};

function tttt(target, name, descriptor) {
    descriptor.value = '';
}

var StoreContext = function () {

    var _store = null;

    var StoreContext = function () {
        function StoreContext() {
            var initState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            _classCallCheck(this, StoreContext);

            _store = (0, _redux.createStore)(this.setState.bind(this), initState);
        }

        _createClass(StoreContext, [{
            key: 'subscribe',
            value: function subscribe(listener) {
                return this.store.subscribe(listener);
            }
        }, {
            key: 'bind',
            value: function bind(component) {
                component.addListener(this.update.bind(this));
            }
        }, {
            key: 'setState',
            value: function setState(state, action) {
                if (action.type == 'INIT_STATE') {
                    return action.payload;
                } else if (action.type == "CHANGE_DATA") {
                    return _lodash2.default.assign({}, state, _defineProperty({}, action.payload.id, action.payload));
                } else if (action.type == "REMOVE_COMPONENT") {
                    var id = action.payload.id;
                    var _state = _lodash2.default.assign({}, state);
                    delete _state[id];
                    return _state;
                }
                return state;
            }
        }, {
            key: 'update',
            value: function update(action) {
                this.store.dispatch(action);
            }
        }, {
            key: 'store',
            get: function get() {
                return _store;
            }
        }]);

        return StoreContext;
    }();

    return StoreContext;
}();

var Component = function () {
    function Component() {
        _classCallCheck(this, Component);

        this._id = _lodash2.default.uniqueId(this.type + "_");
        this.listeners = [];
    }

    _createClass(Component, [{
        key: 'getState',
        value: function getState() {
            return {
                id: this._id,
                type: this.type
            };
        }
    }, {
        key: 'addListener',
        value: function addListener(listener) {
            var _this = this;

            this.listeners.push(listener);
            return function () {
                var index = _this.listeners.indexOf(listener);
                _this.listeners.splice(index, 1);
            };
        }
    }, {
        key: 'update',
        value: function update(type, payload) {
            var _this2 = this;

            this.listeners.slice().forEach(function (listener) {
                return listener({
                    type: type || "CHANGE_DATA",
                    payload: payload || _this2.getState()
                });
            });
        }
    }, {
        key: 'getReactClass',
        value: function getReactClass(storeProxy) {
            storeProxy.bind(this);
            var _self = this;
            var actions = _lodash2.default.reduce(_lodash2.default.functionsIn(this), function (result, v) {
                result[v.substring(1)] = _self[v].bind(_self);
                return result;
            }, {});
            function mapStateToProps(component) {
                return function (state) {
                    return _lodash2.default.assign({}, state[component.id], actions);
                };
            }
            return (0, _reactRedux.connect)(mapStateToProps(this))(this.ReactClass);
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        }
    }]);

    return Component;
}();

var ButtonComponent = (_class = function (_Component) {
    _inherits(ButtonComponent, _Component);

    function ButtonComponent(label) {
        _classCallCheck(this, ButtonComponent);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonComponent).call(this));

        _this3._label = label;
        return _this3;
    }

    _createClass(ButtonComponent, [{
        key: 'onClick',
        value: function onClick() {}
    }, {
        key: 'getState',
        value: function getState(storeContext) {
            return _lodash2.default.assign({}, _get(Object.getPrototypeOf(ButtonComponent.prototype), 'getState', this).call(this, storeContext), {
                label: this._label
            });
        }
    }, {
        key: 'label',
        set: function set(label) {
            this._label = label;
            this.update();
        },
        get: function get() {
            return this._label;
        }
    }]);

    return ButtonComponent;
}(Component), (_applyDecoratedDescriptor(_class.prototype, 'label', [tttt], Object.getOwnPropertyDescriptor(_class.prototype, 'label'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onClick', [Action], Object.getOwnPropertyDescriptor(_class.prototype, 'onClick'), _class.prototype)), _class);

ButtonComponent.prototype.type = "MyButton";
ButtonComponent.prototype.ReactClass = _Button2.default;

var XYLayoutReaclClass = function (_React$Component) {
    _inherits(XYLayoutReaclClass, _React$Component);

    function XYLayoutReaclClass(props, context) {
        _classCallCheck(this, XYLayoutReaclClass);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(XYLayoutReaclClass).call(this, props, context));
    }

    _createClass(XYLayoutReaclClass, [{
        key: 'render',
        value: function render() {
            console.log('---->', this.context);
            var children = this.props.children;
            var ret = children.map(function (child, index) {
                var style = {};
                var WrapComponent = child.ReactClass;
                return _react2.default.createElement(WrapComponent, { key: index });
                //return <div key={index}>Mock Element</div>
            });
            //return (<div style={{ width: '10px' }}>{ret}</div>);
            return _react2.default.createElement(
                'div',
                null,
                ret
            );
        }
    }]);

    return XYLayoutReaclClass;
}(_react2.default.Component);
//这里可以设置在ReactClass中使用store


XYLayoutReaclClass.contextTypes = _reactRedux.Provider.childContextTypes;

var XYLayout = function (_Component2) {
    _inherits(XYLayout, _Component2);

    function XYLayout() {
        _classCallCheck(this, XYLayout);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(XYLayout).call(this));

        _this5.children = [];
        return _this5;
    }

    _createClass(XYLayout, [{
        key: 'append',
        value: function append(component, x, y) {
            x = x || 0;
            y = y || 0;
            this.children.push({
                x: x, y: y, component: component
            });
        }
    }, {
        key: 'getState',
        value: function getState(storeContext) {
            var c = _lodash2.default.map(this.children, function (child) {
                return {
                    x: child.x,
                    y: child.y,
                    ReactClass: child.component.getReactClass(storeContext)
                };
            });
            var state = _defineProperty({}, this.id, _lodash2.default.assign({}, _get(Object.getPrototypeOf(XYLayout.prototype), 'getState', this).call(this, storeContext), { children: c }));
            this.children.forEach(function (child) {
                state[child.component.id] = child.component.getState();
            });
            return state;
        }
    }]);

    return XYLayout;
}(Component);

XYLayout.prototype.type = "XYLayout";
XYLayout.prototype.ReactClass = XYLayoutReaclClass;

var MyPage = function (_Component3) {
    _inherits(MyPage, _Component3);

    function MyPage(layout) {
        _classCallCheck(this, MyPage);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(MyPage).call(this));

        _this6.root = layout || new XYLayout();
        return _this6;
    }

    _createClass(MyPage, [{
        key: 'append',
        value: function append(component) {
            this.root.append(component);
        }
    }, {
        key: 'getState',
        value: function getState(storeContext) {
            return this.root.getState(storeContext);
        }
    }, {
        key: 'getReactClass',
        value: function getReactClass(storeContext) {
            return this.root.getReactClass(storeContext);
        }
    }]);

    return MyPage;
}(Component);

var myPage = new MyPage();
var btn1 = new ButtonComponent("MyButton1");
var btn2 = new ButtonComponent("MyButton2");
myPage.append(btn1);
myPage.append(btn2);
btn2.onClick = function () {
    this.label = "aaaaaa";
    btn1.label = "btn1";
    console.log("proxy btn2", this.label);
};

function reduce(state, action) {
    return state;
}

//var store = createStore(reduce, myPage.getState());
var storeContext = new StoreContext();
storeContext.update({
    type: "INIT_STATE",
    payload: myPage.getState(storeContext)
});
console.log(storeContext);
var WrapMyPage = myPage.getReactClass(storeContext);
var store = storeContext.store;
_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(WrapMyPage, null)
), document.getElementById("root"));
