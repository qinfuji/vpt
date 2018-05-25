const Model = require('../../mocks/demo/list');
module.exports = app => {
  return class AppController extends app.Controller {
    async index() {
      const { ctx } = this;
      await ctx.render('demo/demo.js', {
        url: this.ctx.url.replace(/\/demo/, '')
      });
    }
    async list() {
      const { ctx } = this;
      const pageIndex = ctx.query.pageIndex;
      const pageSize = ctx.query.pageSize;
      ctx.body = Model.getPage(pageIndex, pageSize);
    }

    async detail() {
      const { ctx } = this;
      const id = ctx.query.id;
      ctx.body = Model.getDetail(id);
    }
  };
};
