const initialState = {
  componentModeList: [], //组件列表
  projectInfo: {}, //项目文件信息
  pageOutline: null, //当前选择页面的outline
  openTabs: JSON.parse(sessionStorage.getItem('openTabs') || '[]'), //当前打开的tab
  selectedCompProperties: {}, //属性
  selectedCompEvent: {}, //组件事件
  selectedCompStyles: {}, //组件样式
  selectedCompLayout: {}, //组件布局
  sidePanelWidth: parseInt(localStorage.getItem('sidePanelWidth') || 220, 10)
};

export default initialState;
