module.exports = app => {
  return class ProjectController extends app.Controller {
    /**
     * 获取当前用户选择项目的数据信息
     */
    async data() {
      const { ctx } = this;
      ctx.body = {
        components: [], //可以选择的组件
        projectInfo: {}, //项目基本信息
        projectStructure: {
          pages: [], //页面
          layout: {}, //布局信息
          libs: {}, //项目通用库
          dependencies: {} //项目依赖
        } //当前项目文件信息
      };
    }

    /**
     * 添加可以编辑的组件
     */
    async addEditableComp() {}
    /**
     * 创建项目
     */
    async create() {}
    /**
     * 安装依赖库,第三方库
     */
    async addDependent() {}
  };
};
