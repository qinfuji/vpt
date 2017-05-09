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
     * 颜色
     */
    @observable color : string;

    /**
     * 宽度
     */
    @observable width: number;

    /**
     * 高度
     */
    @observable height: number;

    /**
     * 是否显示
     */
    @observable isShow: boolean = true;


    /**
     * 父组件
     */
    @observable parent : Component;


}