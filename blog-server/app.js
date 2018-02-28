const path = require("path");
const fs = require("fs");
const Koa = require("koa");
const koaCors = require("koa-cors");
const koaBody = require('koa-body');
const koaSession = require('koa-session');
const router = require("./router");
const { server: { port }, session } = require('./config');
require('./db_connection')
require('./logger')
const app = new Koa();
app.keys = ['kkeeyyss']

app.use(koaCors());

app.use(koaSession(session, app))

app.use(koaBody())

app.use(router.routes())

app.use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.log(err)
  logger.error('服务器错误', { err: err.stack, ctx })
})

app.listen(port, () => {
  logger.info('服务器已启动', { port })
});
