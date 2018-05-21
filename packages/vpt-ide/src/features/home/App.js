import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider, Modal, Spin, Menu, Icon, Tabs } from 'antd';
import { ErrorBoundary } from '../common';
import {
  TabsBar,
  SidePanel,
  SidePanelResizer,
  TopMenu,
  ProjectExplorer,
  ToolsBox
} from './';
import { fetchProjectData } from './redux/actions';
import { SplitPane, Pane } from 'vpt-components';
const { TabPane } = Tabs;

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it acording to the type of your app.
*/

export class App extends React.Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  };

  componentDidMount() {
    this.props.actions.fetchProjectData().catch(err => {
      Modal.error({
        title: 'Failed to load project data',
        content: err && (err.message || err.toString())
      });
    });
  }

  renderLoading() {
    return (
      <div className="home-app loading">
        <Spin />
        <span style={{ marginLeft: 20 }}>Loading...</span>
      </div>
    );
  }

  render() {
    if (!this.props.home.features) {
      return this.renderLoading();
    }

    return (
      <LocaleProvider locale={enUS}>
        <div className="home-app">
          <TopMenu />
          <SplitPane split="vertical">
            <Pane initialSize="240px" minSize="240px">
              <Tabs type="card">
                <TabPane key="1" tab="工具">
                  <ToolsBox />
                </TabPane>
                <TabPane key="2" tab="Project" />
                <TabPane key="3" tab="Tab 3" />
              </Tabs>
            </Pane>
            <Pane>456</Pane>
            <Pane initialSize="25%">
              <SplitPane split="horizontal">
                <Pane initialSize="25%">456</Pane>
                <Pane>
                  <Tabs type="card">
                    <TabPane key="1" tab="Property" />
                    <TabPane key="2" tab="Css" />
                    <TabPane key="3" tab="Event" />
                    <TabPane key="4" tab="Layout" />
                  </Tabs>
                </Pane>
              </SplitPane>
            </Pane>
          </SplitPane>
        </div>
      </LocaleProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchProjectData }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
