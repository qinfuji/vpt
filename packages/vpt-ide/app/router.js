module.exports = app => {
  const { router } = app;

  console.log('-------------------');
  app.passport.mount('local');
  router.redirect('/', function() {
    console.log('------>ASSASAS');
  });
  router.redirect('/', '/public111/index.html'); //重定向到首页

  //router.resources('project', '/api/project ', controller.project);
  //router.resources('page', '/api/pages', controller.page);
};
