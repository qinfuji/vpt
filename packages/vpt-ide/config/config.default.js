const path = require('path');

module.exports = appInfo => {
  return {
    keys: 'qwqdsdfdxcsdsdsd12234$%%~',
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.tpl': 'nunjucks'
      }
    },
    bodyParser: {
      jsonLimit: '10mb'
    },
    news: {
      pageSize: 5,
      serverUrl: 'https://hacker-news.firebaseio.com/v0'
    },

    middleware: ['robot', 'gzip', 'compress'],

    robot: {
      ua: [/Baiduspider/i, /curl/i]
    },

    compress: {
      threshold: 2048
    },

    gzip: {
      threshold: 1024 // 小于 1k 的响应体不压缩
    },

    webpack: {
      port: 9000,
      proxy: true,
      webpackConfigList: [require(path.resolve(__dirname, '../webpack.dev.js'))]
    }
  };
};
