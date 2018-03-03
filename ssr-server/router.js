const getHtml = require('../ssr/js/app').default;
const Router = require('koa-router')
const React = require('react')
const path = require('path')
const router = new Router()
const getHeaderStore = require('./store/header')
const getHomeStore = require('./store/home');
const getArticleStore = require('./store/article')

router
  .get('/', async ctx => {
    const store = {
      header: await getHeaderStore(),
      home: await getHomeStore()
    }
    const context = {}
    const html = getHtml('/', context, store)

    await ctx.render('ssr', {
        ssr: html,
        initialData: JSON.stringify(store)
    })
  })
  .get('/article/:id', async ctx => {
    const { params: { id } } = ctx
    const store = {
      header: await getHeaderStore(),
      article: await getArticleStore(id)
    }
    const context = {}
    const html = getHtml(`/article/${id}`, context, store)
    // await ctx.render('ssr', {
    //   ssr: html,
    //   initialData: JSON.stringify(store)
    // })
    ctx.body = `
    <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="screen-orientation" content="portrait">
	<meta name="x5-orientation" content="portrait">
	<meta name="full-screen" content="yes">
	<meta name="x5-fullscreen" content="true">
	<style>
	html {
		font-size: 16px;
	}
	</style>
	<title>施工现场</title>
<link rel="shortcut icon" href="/favicon.ico"><link href="http://localhost:8080/css/style.css" rel="stylesheet"></head>
<body>
	<!-- 挂载点 -->
  <div id="app">${html}</div>
  <script>window.initialData=${JSON.stringify(store)}</script>
<script type="text/javascript" src="http://localhost:8080/js/app.8fd264f2e25274471184.js"></script></body>
</html>
    `
  })

module.exports = router