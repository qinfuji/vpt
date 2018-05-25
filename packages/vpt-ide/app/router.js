module.exports = app => {
  const { router, controller } = app;
  router.get('/demo', controller.demo.demo.index);

  //io.of('/').route('server', io.controller.default.ping);

  router.get('/api/project-data', controller.project.data);
};
