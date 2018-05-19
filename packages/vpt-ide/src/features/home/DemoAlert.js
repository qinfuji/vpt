import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Modal } from 'antd';
import { RekitSteps } from './';

export default class DemoAlert extends Component {
  static propTypes = {
    onClose: PropTypes.func
  };

  static defaultProps = {
    onClose() {}
  };

  render() {
    return (
      <Modal
          footer=""
          maskClosable
          onCancel={this.props.onClose}
          title=""
          visible
          width="700px"
      >
        <div className="home-demo-alert">
          <Alert
              description="This site is only for demo purpose. So Rekit Studio is running on readonly mode. You can't perform any action that alters the project data."
              message="The demo is readonly!"
              showIcon
              type="warning"
          />
          <RekitSteps />
        </div>
      </Modal>
    );
  }
}
