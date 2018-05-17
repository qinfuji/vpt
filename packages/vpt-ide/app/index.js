import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { SplitPane, Pane } from "vpt-components";

import "./styles/global.less";

const mountNode = document.getElementById("app");

render(
  <AppContainer>
    <SplitPane split="horizontal">
      <Pane initialSize="200px">You can use a Pane component</Pane>
      <Pane initialSize="200px">You can use a Pane component</Pane>
      <div>or you can use a plain old div</div>
      <Pane initialSize="25%" minSize="10%" maxSize="500px">
        Using a Pane allows you to specify any constraints directly
      </Pane>
    </SplitPane>
    {/*
    <div>
      <nav>
        <button id="navigation">
          <h3>
            <span id="category" />
            <i class="fa fa-angle-right nav-arrow" aria-hidden="true" />
            <span id="algorithm" />
            <i class="fa fa-caret-down nav-dropdown" aria-hidden="true" />
          </h3>
        </button>
        <div class="top-menu-buttons">
          <div class="btn" id="btn_generate">
            <div class="wrapper">
              <i class="fa fa-pencil" aria-hidden="true" />
              <span class="btn-text">Generate</span>
            </div>
          </div>
          <div class="btn" id="btn_share">
            <div class="wrapper">
              <i class="fa fa-share" aria-hidden="true" /> Share{" "}
              <input type="text" class="collapse" id="shared" />
            </div>
          </div>
          <button id="btn_run">
            <i class="fa fa-play" aria-hidden="true" />
            <span class="btn-text" />
          </button>
          <button id="btn_prev">
            <i class="fa fa-chevron-left" aria-hidden="true" />
            <span class="btn-text">Prev</span>
          </button>
          <button id="btn_pause">
            <i class="fa fa-pause" aria-hidden="true" />
            <span class="btn-text" />
          </button>
          <button id="btn_next">
            <span class="btn-text">Next</span>
            <i class="fa fa-chevron-right" aria-hidden="true" />
          </button>
          <div class="btn">
            <div class="wrapper">
              Interval: <input type="number" value="" id="interval" /> sec
            </div>
          </div>
          <div class="btn" id="btn_fullscreen">
            <div class="wrapper">
              <i class="fa fa-arrows-alt" />
              <span class="btn-text">Fullscreen</span>
            </div>
          </div>
        </div>
      </nav>
      <section class="sidemenu active">
        <div class="search_bar_container">
          <i class="fa fa-search" aria-hidden="true" />
          <input type="text" id="search-bar" autofocus />
        </div>
        <div id="list" />
        <div id="footer">
          <button id="scratch-paper">
            <i class="fa fa-fw fa-code" /> Scratch Paper
          </button>
          <button id="documentation">
            <i class="fa fa-fw fa-book" /> Tracer API
          </button>
          <button class="category open" id="powered-by">
            <i class="fa fa-fw fa-github" /> Powered by ...
          </button>
          
        </div>
      </section>
      <div class="workspace">
        <div class="viewer_container">
          <section class="tab_bar">
            <button class="tab_button" id="btn_doc" data-target="#tab_doc">
              Tracer API
            </button>
            <button
              class="tab_button active"
              id="btn_desc"
              data-target="#tab_desc"
            >
              Description
            </button>
            <button class="tab_button" id="btn_trace" data-target="#tab_module">
              Trace
            </button>
          </section>
          <section class="tab_container">
            <div class="tab" id="tab_doc">
              <div class="wrapper" />
            </div>
            <div class="tab active" id="tab_desc">
              <div class="wrapper" />
            </div>
            <div class="tab module_container" id="tab_module" />
          </section>
        </div>
        <div class="editor_container">
          <section class="files_bar">
            <button class="tab_button btn-left">
              <i class="fa fa-angle-left" aria-hidden="true" />
            </button>
            <button class="tab_button btn-right" disabled="disabled">
              <i class="fa fa-angle-right" aria-hidden="true" />
            </button>
            <div class="wrapper shadow-left">
              <button data-file="tree" class="tab_button">
                tree
              </button>
              <button data-file="all_paths" class="tab_button">
                all_paths
              </button>
              <button data-file="weighted_graph" class="tab_button active">
                weighted_graph
              </button>
              <button data-file="shortest_path" class="tab_button">
                shortest_path
              </button>
              <button data-file="exploration" class="tab_button">
                exploration
              </button>
            </div>
          </section>
          <section class="explanation_container">
            <span id="explanation" />
          </section>
          <section class="data_container">
            <pre id="data" />
          </section>
          <section class="code_container">
            <pre id="code" />
          </section>
        </div>
      </div>
  </div> */}
  </AppContainer>,
  mountNode
);

if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept();
}
