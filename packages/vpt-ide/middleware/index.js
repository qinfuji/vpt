'use strict';

const url = require('url');
const _ = require('lodash');
const bodyParser = require('body-parser');
const fetchProjectData = require('./api/fetchProjectData');
const fetchFileContent = require('./api/fetchFileContent');
const createProject = require('./api/cerateProject');

let lastProjectData = null;

module.exports = function() {
  // eslint-disable-line
  let io = null;
  const bgProcesses = {};
  const rootPath = '/vpt';

  function setupSocketIo(server) {
    io = require('socket.io')(server);

    io.on('connection', client => {
      client.on('disconnect', () => {
        console.log('socket disconnected');
      });
    });
  }

  function reply403(res) {
    res.statusCode = 403;
    res.write('Forbidden: Rekit studio is running on readonly mode.');
    res.end();
  }

  function vptMiddleware(server, app, args) {
    args = args || {};
    setupSocketIo(server);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    return (req, res, next) => {
      const urlObject = url.parse(req.originalUrl);
      const p = urlObject.pathname.replace(rootPath, '');
      try {
        switch (p) {
          case '/api/project-data': {
            lastProjectData = fetchProjectData();
            let o = Object.assign(
              {
                bgProcesses
              },
              lastProjectData
            );
            res.write(JSON.stringify(o));
            res.end();
            break;
          }
          case '/api/file-content': {
            let content = fetchFileContent();
            let o = Object.assign(
              {
                bgProcesses
              },
              content
            );
            res.write(JSON.stringify(o));
            res.end();
            break;
          }
          case '/api/project-create': {
            let projectData = createProject();
            break;
          }
          default: {
            if (/^\/api\//.test(p)) {
              res.statusCode = 404;
              res.write(JSON.stringify({ error: `API not found: ${p}` }));
              res.end();
            } else {
              next();
            }
            break;
          }
        }
      } catch (e) {
        res.statusCode = 500;
        res.write(e.toString());
        res.end();
      }
    };
  }
  return vptMiddleware;
};
