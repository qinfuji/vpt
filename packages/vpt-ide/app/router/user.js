module.exports = app => {
  const { info } = app.controller.user;

  /**
   * 项目数据
   */
  app.router.get('/users/:id', info);
};
