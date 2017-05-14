
import { observable, toJS } from 'mobx';

export class CssProperties {

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


    @observable fontFamily: string;
    @observable fontSize: string | number;

    @observable color: string;

    @observable width: number;
    @observable height: number;
}
