// const LocalStrategy = require('passport-local').Strategy;
// const debug = require('debug');

const assert = require('assert');

module.exports = app => {
  console.log('----------------------->');
  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    console.log('app.passport.verify', user);
    assert(user.provider, 'user.provider should exists');
    assert(user.id, 'user.id should exists');
  });
  app.passport.serializeUser(async (ctx, user) => {
    console.log('app.passport.serializeUser', user);
  });
  app.passport.deserializeUser(async (ctx, user) => {
    console.log('app.passport.deserializeUser', user);
  });
};
