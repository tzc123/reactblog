const getHtml = require('../ssr/js/app').default;
const Router = require('koa-router')
const React = require('react')
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
			initialData: JSON.stringify(store)
	})
})

module.exports = router