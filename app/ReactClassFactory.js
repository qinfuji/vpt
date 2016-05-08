import React from 'react';
import ReactDom from "react-dom";
import hoistStatics from "hoist-non-react-statics";

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function connect(instance, store) {


    return function wrapWithConnect(WrappedComponent) {
        class Connect extends React.Component {

            constructor(props, context) {
                super(props, context);
                const storeState = store.getState()[instance.id];
                this.state = { storeState };
            }

            isSubscribed() {
                return typeof this.unsubscribe === 'function';
            }

            trySubscribe() {
                if (!this.unsubscribe) {
                    this.unsubscribe = store.subscribe(this.handleChange.bind(this));
                }
            }

            tryUnsubscribe() {
                if (this.unsubscribe) {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            }

            componentDidMount() {
                this.trySubscribe();
            }

            componentWillUnmount() {
                this.tryUnsubscribe();
            }

            handleChange() {
                if (!this.unsubscribe) {
                    return;
                }
                const prevStoreState = this.state.storeState;
                const storeState = store.getState()[instance.id];

                if (prevStoreState !== storeState) {
                    this.setState({ storeState });
                }
            }

            render() {
                var s = () => { };
                return this.renderedElement = React.createElement(WrappedComponent, {...{}});
        }
    };
    Connect.displayName = `Connect(${getDisplayName(WrappedComponent)})`;
    Connect.WrappedComponent = WrappedComponent;
    return hoistStatics(Connect, WrappedComponent);
};
};


class ReactClassFactory {

    constructor() {
        this.components = {};
    }

    /**
     * 得到类型对应的reactClass
     */
    get(component) {
        var type = component.type;
        var reactClass = this.components[type];

    }

    /**
     * 注册组件类型对应的React Class 
     */
    register(type, reactClass) {
        this.components[type] = reactClass;
    }
};

export default new ReactClassFactory();
