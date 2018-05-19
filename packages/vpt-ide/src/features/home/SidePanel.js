import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { Dropdown, Icon, Menu, Modal } from 'antd';
import * as actions from './redux/actions';
import history from '../../common/history';
import { SearchInput } from '../common';
import { showCmdDialog } from '../rekit-cmds/redux/actions';
import { About, DemoAlert, ProjectExplorer } from './';

export class SidePanel extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    searchKey: null,
    aboutDialogVisible: process.env.REKIT_ENV === 'demo'
  };

  showAbout = () => {
    this.setState({
      aboutDialogVisible: true
    });
  };

  hideAbout = () => {
    this.setState({
      aboutDialogVisible: false
    });
  };

  handleAddMenuClick = evt => {
    switch (evt.key) {
      case 'add-feature':
      case 'add-component':
      case 'add-action':
        this.props.actions.showCmdDialog('cmd', {
          type: evt.key,
          ...this.cmdContext
        });
        break;
      case 'build':
        history.push('/tools/build');
        break;
      case 'tests':
        history.push('/tools/tests');
        break;
      case 'test-coverage':
        history.push('/tools/coverage');
        break;
      case 'about':
        this.showAbout();
        break;
      default:
        break;
    }
  };

  handleSearch = key => {
    this.setState({
      searchKey: key
    });
  };

  renderAddMenu = () => {
    return (
      <Menu onClick={this.handleAddMenuClick}>
        <Menu.Item key="add-feature">
          <Icon style={{ color: '#29b6f6' }}
              type="book"
          /> &nbsp;Add Feature
        </Menu.Item>
        <Menu.Item key="add-action">
          <Icon style={{ color: '#ec407a' }}
              type="notification"
          /> &nbsp;Add
          Action
        </Menu.Item>
        <Menu.Item key="add-component">
          <Icon style={{ color: '#F08036' }}
              type="appstore-o"
          /> &nbsp;Add
          Component
        </Menu.Item>
        <Menu.Item key="tests">
          <Icon style={{ color: 'transparent' }}
              type="appstore-o"
          /> &nbsp;Run
          Tests
        </Menu.Item>
        <Menu.Item key="test-coverage">
          <Icon style={{ color: 'transparent' }}
              type="appstore-o"
          /> &nbsp;Test
          Coverage
        </Menu.Item>
        <Menu.Item key="build">
          <Icon style={{ color: 'transparent' }}
              type="appstore-o"
          />{' '}
          &nbsp;Build
        </Menu.Item>
        <Menu.Item key="about">
          <Icon style={{ color: 'transparent' }}
              type="appstore-o"
          />{' '}
          &nbsp;About
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { home } = this.props;
    const prjName = home.projectName || home.projectRoot.split('/').pop();
    return (
      <div
          className="home-side-panel dark-theme"
          style={{ width: `${home.sidePanelWidth}px` }}
      >
        <div className="header">
          <Link
              className="home-link"
              title={this.props.home.projectRoot}
              to="/"
          >
            <h5>
              <Icon type="home" /> {prjName}
            </h5>
          </Link>
          <Dropdown overlay={this.renderAddMenu()}>
            <label>
              <Icon
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                  type="ellipsis"
              />
            </label>
          </Dropdown>
        </div>
        <div className="toolbar">
          <SearchInput onSearch={this.handleSearch} />
        </div>
        <ProjectExplorer searchKey={this.state.searchKey} />
        {this.state.aboutDialogVisible && (
          <Modal
              footer=""
              maskClosable
              onCancel={this.hideAbout}
              style={{ top: '50px' }}
              title=""
              visible
              width={process.env.REKIT_ENV === 'demo' ? '760px' : '360px'}
          >
            <About />
          </Modal>
        )}
        {home.demoAlertVisible && (
          <DemoAlert onClose={this.props.actions.hideDemoAlert} />
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, showCmdDialog }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
