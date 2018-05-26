module.exports = app => {
  const { router, controller } = app;
  router.get('/demo', controller.demo.demo.index);

  router.redirect('/', '/public/index.html'); //重定向到首页
  //io.of('/').route('server', io.controller.default.ping);

  router.get('/api/project-data', controller.project.data);
};
