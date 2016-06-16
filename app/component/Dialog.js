export default class Dialog extends Component {
    constructor(props) {
        this.components = [];
        super(props);
    }


    open() {
        //打开对话框
    }

    close() {
        //关闭对话框
    }

    append(compnent) {
        this.components.push(component);
    }

    getState(storeContext) {

    }


};
