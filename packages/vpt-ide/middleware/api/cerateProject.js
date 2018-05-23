//创建项目

function createProject() {
  return {
    componentModeList: [],
    projectInfo: {
      name: '',
      logo: '',
      descript: ''
    },
    projectFiles: {}
  };
}

module.exports = createProject;
