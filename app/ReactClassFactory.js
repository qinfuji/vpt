
class ReactClassFactory {
    
    constructor() {
        this.components = {};
    }

    /**
     * 得到类型对应的reactClass
     */
    get(type) {
        return this.components[type];
    }

    /**
     * 注册组件类型对应的React Class 
     */
    register(type, reactClass) {
        this.components[type] = reactClass;
    }
};
 
export default new ReactClassFactory();
