const path = require("path");
const fs = require("fs");
const Koa = require("koa");
const Boom = require('boom')
// const koaStatic = require("koa-static");
const koaCors = require("koa-cors");
const koaBody = require('koa-body');
const koaSession = require('koa-session');
const router = require("./router");
global.logger = require('./logger')
const { server: { staticPath, staticOptions, port }, session } = require('./config');
require('./db_connection')
const app = new Koa();

app.keys = ['kkeeyyss']

app.use(koaCors());

// app.use(koaStatic(staticPath, staticOptions));

app.use(koaSession(session, app))

app.use(koaBody())

app.use(router.routes())

app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}))

app.on('error', (err, ctx) => {
  console.log(err)
  logger.error('服务器错误', { err: err.stack, ctx })
})

app.listen(port, () => {
  logger.info('服务器已启动', { port })
});
