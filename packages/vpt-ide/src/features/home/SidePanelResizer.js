import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { setSidePanelWidth } from './redux/actions';

export class SidePanelResizer extends Component {
  static propTypes = {
    sidePanelWidth: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    dragging: false
  };

  assignRef = node => {
    this.node = node;
  };

  handleMouseDown = evt => {
    this.setState({ dragging: true });
  };

  handleMouseMove = evt => {
    if (!this.state.dragging) return;
    this.props.actions.setSidePanelWidth(evt.pageX);
    window.dispatchEvent(new window.Event('resize'));
  };

  handleMouseUp = () => {
    this.setState({ dragging: false });
  };

  render() {
    return (
      <div
          className={classnames('home-side-panel-resizer', {
          'is-dragging': this.state.dragging
        })}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          ref={this.assignRef}
          style={{ left: `${this.props.sidePanelWidth}px` }}
      >
        <div
            className="true-resizer"
            onMouseDown={this.handleMouseDown}
            style={{
            left: `${this.state.dragging ? this.props.sidePanelWidth : 0}px`
          }}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    sidePanelWidth: state.home.sidePanelWidth
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setSidePanelWidth }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelResizer);
