
import { observable, toJS } from 'mobx';

export class CssProperties {
    @observable public bbbb: "1";

    printOwner() {
        console.log("aaaaa--->", Object.getOwnPropertyNames(this));
    }
}
