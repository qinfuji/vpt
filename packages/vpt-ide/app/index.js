import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { Panel } from "vpt-components";
//console.log(Panel.propTypes);
let div = document.createElement("div");
div.setAttribute("id", "app");
document.body.appendChild(div);

const mountNode = document.getElementById("app");

render(
  <AppContainer>
    <Panel></Panel>
  </AppContainer>,
  mountNode
);

if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept();
}
