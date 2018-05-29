const { Controller } = require('egg');
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    ctx.body = {
      name: `hello ${ctx.params.id}`
    };
  }
}

module.exports = UserController;
