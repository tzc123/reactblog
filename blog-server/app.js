const path = require("path");
const fs = require("fs");
const Koa = require("koa");
const static = require("koa-static");
const cors = require("koa-cors");
const koaBody = require('koa-body');
const koaSession = require('koa-session');
const router = require("./router");
const { server: { staticPath, port }, session } = require('./config/index');
require('./db_connection')
const app = new Koa();

app.use(cors());

app.use(koaBody())

app.use(static(staticPath));

app.use(koaSession(session, app))

app.use(ctx => {
  ctx.set('Cache-Control', 'max-age=100000')
})

app.use(router.routes());

app.listen(port, () => {
  console.log(`server start at ${port}`);
});
