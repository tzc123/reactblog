const Koa = require('koa');
const router = require('./router')
const render = require('koa-ejs');
const path = require('path')

const app = new Koa()

render(app, {
  root: path.join(__dirname, '../asset'),
  layout: 'ssr',
  viewExt: 'html',
});

app.use(router.routes())

app.listen(2333, function () {
  console.log('后端渲染已部署')
})