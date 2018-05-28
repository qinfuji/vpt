module.exports = app => {
  const {
    data,
    setting,
    components,
    depnetenties,
    addDependent,
    addComponent,
    create
  } = app.controller.project;

  /**
   * 项目数据
   */
  app.router.get('/project/:id/data', data);
  // /**
  //  * 项目配置信息
  //  */
  setting && app.router.get('/project/:id/setting', setting);

  /**
   *项目可使用（编辑）的组件列表
   */
  components && app.router.get('/project/:id/components', components);

  /**
   * 项目依赖库
   */
  depnetenties && app.router.get('/project/:id/dependenties', depnetenties);

  /**
   * 添加项目依赖
   */
  addDependent && app.router.post('/peoject/:id/addDependent', addDependent);

  /**
   *  增加
   */
  addComponent && app.router.post('/project/:id/addComponent', addComponent);

  /**
   * 创建项目
   */
  create && app.router.post('/project/cerate', create);
};
