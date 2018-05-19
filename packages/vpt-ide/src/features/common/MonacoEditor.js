/* eslint no-underscore-dangle: 0 */
/* global monaco */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

function noop() {}
let editorInstance = null; // Only one global monaco editor.
const getEditorNode = () => editorInstance.getDomNode().parentNode;

export default class MonacoEditor extends Component {
  static propTypes = {
    theme: PropTypes.string,
    language: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    editorDidMount: PropTypes.func,
    editorWillMount: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    language: 'javascript',
    theme: 'vs-dark',
    options: {},
    value: null,
    editorDidMount: noop,
    editorWillMount: noop,
    onChange: noop
  };

  constructor(props) {
    super(props);
    this.monacoListeners = [];
  }

  componentDidMount() {
    this.afterViewInit();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== this.__current_value) {
      // Always refer to the latest value
      this.__current_value = this.props.value;
      // Consider the situation of rendering 1+ times before the editor mounted
      if (this.editor) {
        this.__prevent_trigger_change_event = true;
        this.editor.setValue(this.__current_value);
        this.__prevent_trigger_change_event = false;
      }
    }
    if (prevProps.language !== this.props.language) {
      monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
    }
  }

  componentWillUnmount() {
    // editorInstance.onDidChangeModelContent();
    this.containerElement.removeChild(getEditorNode());
    this.editor = null;
    this.monacoListeners.forEach(lis => lis.dispose());
    window.removeEventListener('resize', this.handleWindowResize);
  }

  editorWillMount(monaco) {
    const { editorWillMount } = this.props;
    editorWillMount(monaco);
  }

  editorDidMount(editor, monaco) {
    this.props.editorDidMount(editor, monaco);
    this.handleWindowResize();
    this.monacoListeners.push(editor.onDidChangeModelContent((event) => {
      const value = editor.getValue();

      // Always refer to the latest value
      this.__current_value = value;

      // Only invoking when user input changed
      if (!this.__prevent_trigger_change_event) {
        this.props.onChange(value, event);
      }
    }));
  }

  afterViewInit() {
    if (window.monaco !== undefined) {
      this.initMonaco();
      return;
    }
    const loaderUrl = 'vs/loader.js';
    const onGotAmdLoader = () => {
      // Load monaco
      window.require(['vs/editor/editor.main'], () => {
        this.initMonaco();
      });

      // Call the delayed callbacks when AMD loader has been loaded
      if (window.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
        window.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false;
        const loaderCallbacks = window.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;

        if (loaderCallbacks && loaderCallbacks.length) {
          let currentCallback = loaderCallbacks.shift();

          while (currentCallback) {
            currentCallback.fn.call(currentCallback.context);
            currentCallback = loaderCallbacks.shift();
          }
        }
      }
    };

    // Load AMD loader if necessary
    if (window.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
      // We need to avoid loading multiple loader.js when there are multiple editors loading
      // concurrently, delay to call callbacks except the first one
      // eslint-disable-next-line max-len
      window.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ = window.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ || [];
      window.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({
        window: this,
        fn: onGotAmdLoader
      });
    } else if (typeof window.require === 'undefined') {
      const loaderScript = window.document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = loaderUrl;
      loaderScript.addEventListener('load', onGotAmdLoader);
      window.document.body.appendChild(loaderScript);
      window.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
    } else {
      onGotAmdLoader();
    }
  }

  initMonaco() {
    const { theme, options, language, value } = this.props;
    // const context = this.props.context || window;
    // Before initializing monaco editor
    this.editorWillMount(monaco);
    if (!editorInstance) {
      const domNode = document.createElement('div');
      domNode.className = 'monaco-editor-node';
      this.containerElement.appendChild(domNode);
      editorInstance = monaco.editor.create(domNode, {
        language,
        value,
        ...options
      });
    } else {
      monaco.editor.setModelLanguage(editorInstance.getModel(), language);
      this.containerElement.appendChild(getEditorNode());
    }
    monaco.editor.setTheme(theme);
    this.editor = editorInstance;
    this.editorDidMount(this.editor, monaco);
  }

  assignRef = (component) => {
    this.containerElement = component;
  }

  handleWindowResize = () => {
    // const { style } = getEditorNode();
    // style.width = `${this.containerElement.offsetWidth}px`;
    // style.height = `${this.containerElement.offsetHeight}px`;
    this.editor.layout();
  }

  render() {
    return (
      <div className="common-monaco-editor"
          ref={this.assignRef}
      />
    );
  }
}
