import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { ToolsBox, ProjectExplorer } from './';
import { SimpleProxyComponent } from './';

const tabkey = {
  TOOLS_BOX: 'Tools Box',
  PROJECT_EXPLORER: 'Project Explorer'
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid;
  background-color: #fff;
`;

const Content = styled.div``;
class SidePanel extends Component {
  activeKey = '';

  tabsChange(activeKey) {
    this.activeKey = activeKey;
  }

  render() {
    let CurComponent = this.activeKey ? <ToolsBox /> : <ToolsBox />;
    return (
      <Container>
        <Tabs onChange={this.tabsChange.bind(this)} type="card">
          <TabPane key={tabkey.TOOLS_BOX} tab={tabkey.TOOLS_BOX} />
          <TabPane
              key={tabkey.PROJECT_EXPLORER}
              tab={tabkey.PROJECT_EXPLORER}
          />
        </Tabs>
        <Content>
          <SimpleProxyComponent component={CurComponent} />
        </Content>
      </Container>
    );
  }
}

export default SidePanel;
