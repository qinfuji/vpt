import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import axios from 'axios';
import { Button, Icon, message, Modal, Spin, Tooltip } from 'antd';
import { MonacoEditor, UnloadComponent } from '../common';
import { fetchFileContent, saveFile, showDemoAlert } from './redux/actions';
import editorStateMap from './editorStateMap';

export class CodeEditor extends Component {
  static propTypes = {
    // home: PropTypes.object.isRequired,
    fileContentById: PropTypes.object.isRequired,
    fileContentNeedReload: PropTypes.object.isRequired,
    fetchFileContentPending: PropTypes.bool.isRequired, // eslint-disable-line
    saveFilePending: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    file: PropTypes.string.isRequired,
    onError: PropTypes.func,
    onStateChange: PropTypes.func,
    onRunTest: PropTypes.func
  };

  static defaultProps = {
    onError() {},
    onStateChange() {},
    onRunTest: null
  };

  constructor(props) {
    super(props);
    // BIG magic here! When open/switch a new file, it will trigger cursor change first
    // which causes to save status. So if the file is new open, should not save its state
    // before recover the state. So when file is changed set this flag to true. After recover
    // the status, set it to false so that state could be saved.
    this.preventSaveEditorState = true;

    this.monacoListeners = [];
  }

  state = {
    notFound: false,
    currentContent: '',
    loadingFile: false,
    loadingEditor: true,
    cursorPos: {
      lineNumber: 1,
      column: 1
    }
  };

  async componentWillMount() {
    this.setState({
      loadingFile: true
    });
    await this.checkAndFetchFileContent(this.props);
    this.setState({
      // eslint-disable-line
      currentContent: this.getFileContent(),
      loadingFile: false
    });
    this.props.onStateChange({ hasChange: false });
  }

  async componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (props.file !== nextProps.file) {
      // When file is changed, prevent saving before its state is restored.
      this.props.onStateChange({ hasChange: false });
      this.preventSaveEditorState = true;
      this.setState({
        loadingFile: true,
        currentContent: ''
      });
      await this.checkAndFetchFileContent(nextProps);
      this.setState({
        loadingFile: false
      });
      this.reloadContent();
    } else if (nextProps.fileContentNeedReload[nextProps.file]) {
      const oldContent = this.getFileContent();
      const hasChange = this.hasChange(); // has changed
      await this.checkAndFetchFileContent(nextProps);
      this.setState({
        loadingFile: false
      });
      const newContent = this.getFileContent();
      if (
        hasChange &&
        oldContent !== newContent &&
        newContent !== this.state.currentContent
      ) {
        Modal.confirm({
          title: 'The file has changed on disk.',
          content: 'Do you want to reload it?',
          okText: 'Yes',
          cancelText: 'No',
          onOk: this.reloadContent
        });
      } else if (!hasChange) {
        this.reloadContent();
      }
    }
  }

  componentWillUnmount() {
    this.monacoListeners.forEach(lis => lis.dispose());
  }

  getFileContent() {
    return this.props.fileContentById[this.props.file];
  }

  formatCode = () => {
    this.setState({ loadingFile: true });
    const ext = this.props.file.split('.').pop();
    axios
      .post('/rekit/api/format-code', {
        content: this.state.currentContent,
        ext
      })
      .then(res => {
        this.editor.executeEdits('format', [
          {
            range: new monaco.Range(1, 1, 100000, 1),
            text: res.data.content,
            forceMoveMarkers: true
          }
        ]);
        this.setState(
          {
            loadingFile: false,
            currentContent: res.data.content
          },
          () => this.props.onStateChange({ hasChange: this.hasChange() })
        );
      })
      .catch(() => {
        this.setState({
          loadingFile: false
        });
      });
  };

  reloadContent = () => {
    // Reload content from Redux store to internal state(editor).
    this.setState({
      currentContent: this.getFileContent()
    });
    this.props.onStateChange({ hasChange: false });
    this.recoverEditorState();
  };

  recoverEditorState = () => {
    if (!this.editor) return;
    const { file } = this.props;
    this.preventSaveEditorState = false;
    const editorState = editorStateMap[file] || null;
    this.editor.restoreViewState(editorState);
    this.editor.focus();
  };

  hasChange() {
    // Whether the editor content is different from which in store.
    return this.state.currentContent !== this.getFileContent();
  }

  checkAndFetchFileContent(props) {
    // Check if content exists or need reload, if yes then fetch it.
    const {
      fileContentById,
      fileContentNeedReload,
      fetchFileContentPending,
      file
    } = props;
    if (
      (!_.has(fileContentById, file) || fileContentNeedReload[file]) &&
      !fetchFileContentPending
    ) {
      return this.props.actions
        .fetchFileContent(props.file)
        .then(() => {
          this.setState({ notFound: false });
        })
        .catch(e => {
          message.error(`Failed to load file: ${e.toString()}`);
          if (_.get(e, 'response.status') === 404) {
            this.setState({ notFound: true });
            this.props.onError(404);
          }
        });
    } else {
      this.setState({ notFound: false });
      return Promise.resolve();
    }
  }

  handleEditorChange = newValue => {
    this.setState({
      currentContent: newValue
    });
    this.props.onStateChange({ hasChange: newValue !== this.getFileContent() });
  };

  handleEditorDidMount = editor => {
    this.setState({
      loadingEditor: false
    });
    this.editor = editor;
    editor.focus();

    // This seems to be able to add multiple times.
    editor.addCommand([monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S], () => {
      // eslint-disable-line
      if (this.hasChange()) this.handleSave();
    });
    editor.addCommand([monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B], () => {
      // eslint-disable-line
      this.formatCode();
    });
    this.monacoListeners.push(
      editor.onDidChangeCursorPosition(() =>
        this.setState({ cursorPos: editor.getPosition() })
      ),
      editor.onDidChangeCursorPosition(this.handleEditorCursorScrollerChange),
      editor.onDidScrollChange(this.handleEditorCursorScrollerChange)
    );

    // // It needs some time for editor to load its content
    setTimeout(this.recoverEditorState, 30);
  };

  handleEditorCursorScrollerChange = () => {
    if (this.preventSaveEditorState) return;
    const { file } = this.props;

    editorStateMap[file] = this.editor.saveViewState();
  };

  handleRunTest = () => {
    this.props.onRunTest();
  };

  handleSave = () => {
    this.props.actions
      .saveFile(this.props.file, this.state.currentContent)
      .then(() => this.props.onStateChange({ hasChange: false }))
      .catch(() => {
        if (process.env.REKIT_ENV === 'demo') {
          this.props.actions.showDemoAlert();
          return;
        }
        Modal.error({
          title: 'Failed to save.',
          content: 'Please retry or use other text editor.'
        });
      });
  };

  handleCancel = () => {
    Modal.confirm({
      content: 'Are you sure to discard your changes?',
      okText: 'Discard',
      cancelText: 'No',
      onOk: () => {
        this.setState({
          currentContent: this.getFileContent()
        });
        this.props.onStateChange({ hasChange: false });
      }
    });
  };

  render() {
    if (this.state.notFound) {
      return (
        <div className="home-code-editor">
          <div className="code-editor-toolbar">
            <div className="file-path"
                title={this.props.file}
            >
              {this.props.file}
            </div>
          </div>
          <div style={{ color: 'red', marginTop: '10px', marginLeft: '15px' }}>
            File not found.
          </div>
        </div>
      );
    }
    const options = {
      selectOnLineNumbers: true,
      renderWhitespace: 'boundary'
    };
    const ext = this.props.file.split('.').pop();
    const lang =
      {
        js: 'javascript',
        md: 'markdown'
      }[ext] || ext;
    const hasChange = this.hasChange();
    const { saveFilePending } = this.props;
    return (
      <div className="home-code-editor">
        <Prompt
            message="The change is not saved, are you sure to leave? Unsaved change will be discarded."
            when={hasChange}
        />
        {hasChange && <UnloadComponent />}
        <div className="code-editor-toolbar">
          <div className="file-path">{this.props.file}</div>
          <div>
            {this.state.cursorPos.column && (
              <span className="cursor-pos">
                Ln {this.state.cursorPos.lineNumber}, Col{' '}
                {this.state.cursorPos.column}
              </span>
            )}
            <Tooltip
                overlayClassName="tooltip-no-arrow"
                title={
                <label>
                  Beautify your code using prettier{' '}
                  <span style={{ color: '#888', fontSize: '12px' }}>
                    ({/^Mac/.test(window.navigator.platform) ? 'Cmd' : 'Ctrl'}+B)
                  </span>
                </label>
              }
            >
              <Button onClick={this.formatCode}
                  size="small"
              >
                <Icon type="menu-fold" />
              </Button>
            </Tooltip>
            {this.props.onRunTest && (
              <Button onClick={this.handleRunTest}
                  size="small"
                  type="primary"
              >
                <Icon type="play-circle-o" /> Run test
              </Button>
            )}
            {hasChange &&
              !this.state.loadingFile && (
                <Tooltip
                    title={
                    <label>
                      Save{' '}
                      <span style={{ color: '#888', fontSize: '12px' }}>
                        ({/^Mac/.test(window.navigator.platform)
                          ? 'Cmd'
                          : 'Ctrl'}+S)
                      </span>
                    </label>
                  }
                >
                  <Button
                      disabled={saveFilePending}
                      loading={saveFilePending}
                      onClick={this.handleSave}
                      size="small"
                      type="primary"
                  >
                    <Icon type="save" />
                  </Button>
                </Tooltip>
              )}
            {hasChange &&
              !this.state.loadingFile && (
                <Tooltip title="Discard changes">
                  <Button
                      disabled={saveFilePending}
                      onClick={this.handleCancel}
                      size="small"
                  >
                    <Icon type="close-circle" />
                  </Button>
                </Tooltip>
              )}
          </div>
        </div>
        {(this.state.loadingFile || this.state.loadingEditor) && (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        )}
        <MonacoEditor
            editorDidMount={this.handleEditorDidMount}
            language={lang}
            onChange={this.handleEditorChange}
            options={options}
            value={this.state.currentContent}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    // home: state.home,
    fileContentById: state.home.fileContentById,
    fileContentNeedReload: state.home.fileContentNeedReload,
    fetchFileContentPending: state.home.fetchFileContentPending,
    saveFilePending: state.home.saveFilePending
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { fetchFileContent, saveFile, showDemoAlert },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeEditor);
