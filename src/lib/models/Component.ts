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
    @observable color: string;

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
    @observable parent: Component;

    @observable position: string;
    @observable left: number = 0;
    @observable right: number = 0;
    @observable top: number = 0;
    @observable bottom: number = 0;

    @observable border: string;
    @observable borderRightWidth: number;
    @observable borderTopWidth: number;
    @observable borderLefttWidth: number;
    @observable borderRightColor: string;
    @observable borderLeftColor: string;
    @observable borderTopColor: string;
    @observable borderButtomColor: string;

    @observable margin: string;
    @observable marginBottom: number = 0;
    @observable marginLeft: number = 0;
    @observable marginTop: number = 0;
    @observable marginRight: number = 0;


    @observable padding: string;
    @observable paddingBottom: number = 0;
    @observable paddingRight: number = 0;
    @observable paddingLeft: number = 0;
    @observable paddingTop: number = 0;


}