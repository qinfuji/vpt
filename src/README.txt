
/**
 * 整个app的状态对象
 */
class App{
    /**
     * http服务
     */
    async http("serviceName"){

    }
}
/**
 * 这个其实就是store
 */
class PageDataModule{
    
}

class PageDataModuleExt extends PageDataModule{
    @oberable userModele = []
}


class BasePageContorl{
    openDialog(path){

    }
}

/**
 * 页面所有组件的回调接口，用来修改PageModul,已经修改组件状态
 */
class PageContorl(){
    @bind(pageModule)
    @action
    btnNameClick(){

    }

    /**
     * 验证的方法
     */
    formValidate(){

    }

    /**
     * form 表单变化
     */
    formChange(changeEvent){

    }
}

/**
 * 组件的状态
 * 这个也是自动生成的，请不要轻易修改
 */
class PageState{
    @oberable btn = {label:""}
    @oberable table = {};
    construct(){
        this.btn =  new Button();
        this.table = new Table();
    }

    //这里设置组件间的关系
    @action init(){
        this.btn.label = "";
        this.table.headFiles = [{}]
        this.table.dataBind(dataModule.users);
    }
}


ButtonComponent.dataBind(PageModule.btmInstance);

