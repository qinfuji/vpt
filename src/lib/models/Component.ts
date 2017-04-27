import { observable, action, autorun, observe, extendObservable, toJS } from 'mobx';

export class Component {
    
    /**
     * 组件样式
     */
    @observable className: string;

    /**
     * 字体
     */
    @observable fontFamily: string;

    /**
     * 字体大小
     */
    @observable fontSize: string | number;

    /**
     * 宽度
     */
    @observable width: string | number;

    /**
     * 高度
     */
    @observable height: string | number;

    /**
     * 是否显示
     */
    @observable isShow: boolean = true;


    /**
     * 父组件
     */
    @observable parent : Component;

}