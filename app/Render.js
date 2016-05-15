import React from 'react';
import ReactDom from "react-dom";

import StoreContext from './StoreContext';
import {Provider} from 'react-redux';

export default (component, containerEle) => {
    var storeContext = new StoreContext();
    storeContext.update({
        type: "INIT_STATE",
        payload: component.getState(storeContext)
    });
    var WrapMyPage = component.getReactClass(storeContext);
    var store = storeContext.store;
    ReactDom.render(<Provider store={store}><WrapMyPage></WrapMyPage></Provider>, containerEle);
};
