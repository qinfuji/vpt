module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);

  io.of('/').route('server', io.controller.default.ping);
};
