import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { ToolsBox, ProjectExplorer } from './';
const Container = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid;
  background-color: #fff;
`;

class SidePanel extends Component {
  render() {
    return (
      <Container>
        <Tabs type="card">
          <TabPane key="1" tab="Tools Box">
            <ToolsBox />
          </TabPane>
          <TabPane key="2" tab="Project Explorer" />
        </Tabs>
      </Container>
    );
  }
}

export default SidePanel;
