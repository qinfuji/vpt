import { observable, action, autorun, observe, extendObservable, toJS, computed } from 'mobx';

import { CssProperties } from './CssProperties';
import { Container } from './Container';

export abstract class Component extends CssProperties {

    private _parent: Container;
    /**
     * 组件样式
     */
    @observable className: string;

    /**
     * 是否显示
     */
    @observable isShow: boolean = true;

    /**
     * 父组件
     */
    set parent(parent: Container) {
        this._parent = parent;
        this.parentMounted();
    };

    get parent() {
        return this._parent;
    }

    /**
     * 当父容器被设置时调用
     */
    abstract parentMounted();

}