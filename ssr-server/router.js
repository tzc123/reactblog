const getHtml = require('../ssr/js/app').default;
const Router = require('koa-router')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { Provider } = require('mobx-react')
const path = require('path')
const router = new Router()
const getHeaderStore = require('./store/header')
const getHomeStore = require('./store/home');

router.get('/', async ctx => {
  const store = {
    header: await getHeaderStore(),
    home: await getHomeStore()
  }
  const context = {}
	const html = getHtml('/', context, store)

	await ctx.render('ssr', {
			ssr: html,
			initialData: store
	})
})

module.exports = router