module.exports = app => {
  return class AppController extends app.Controller {
    async data() {
      const { ctx } = this;
      ctx.body = {};
    }
  };
};
