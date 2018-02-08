const path = require("path");
const fs = require("fs");
const Koa = require("koa");
const koaStatic = require("koa-static");
// const koaCors = require("koa-cors");
const koaBody = require('koa-body');
const koaSession = require('koa-session');
const router = require("./router");
global.logger = require('./logger')
const { server: { staticPath, staticOptions, port }, session } = require('./config/index');
require('./db_connection')
const app = new Koa();

// app.use(koaCors());
app.use(koaStatic(staticPath, staticOptions));

app.use(koaSession(session, app))

app.use(koaBody())

app.use(router.routes());

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx)
})

app.listen(port, () => {
  logger.info('server start', { port })
});
