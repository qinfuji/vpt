
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
    async openDialog(path){

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
class PageDefine extends BaseDefine{
    @oberable btn = {label:""}
    @oberable table = {};
    
    eventProxy : EventProxy|null = null 

    construct(pageControl){
        this.Page =  new Page();
        this.btn =   new Button({title:""});
        this.table = new Table();
        this.splitLayout = new SplitLayout();
        this.splitLayout.dividerLoaction = 20;
        this.splitLayout.orientation = SplitPanelOrientation.HORIZONTAL;
        this.pageControler = pageControl;
        this.eventProxy = eventProxy(this.pageControle);
    }

    //这里设置组件间的关系
    @action init(){
        this.splitLayout.add(this.but , SplitLayout.FIRST);
        this.splitLayout.add(this.label, SplitLayout.SECOND);
        setLayout(this.splitLayout);
        this.btn.label = "";
        this.btn.onClick= eventProxy("onclick"); //使用时间代理s
        this.table.headFiles = [{}]
        this.table.dataBind(dataModule.users);
        add(btn);
        add(table);
    }

    ReactElement build(){
        //构造ReactElement
    }
}


ButtonComponent.dataBind(PageModule.btmInstance);


function eventProxy(control:any){
    return function(eventName){
        return control[eventName]? control[eventName].bind(control) : ()=> void
    }
}

