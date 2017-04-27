import { observable, action, autorun, observe, extendObservable, toJS } from 'mobx';

export class Global {

    //项目的全局theme
    @observable theme: string;

    /**
     * 全局错误信息
     */
    @observable errorMessage: string;
}
