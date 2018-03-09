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
    await ctx.render('ssr', {
      ssr: html,
      initialData: JSON.stringify(store)
    })
  })
  .get('/about', async ctx => {
    const store = {
      header: await getHeaderStore()
    }
    const context = {}
    const html = getHtml(`/about`, context, store)
    await ctx.render('ssr', {
      ssr: html,
      initialData: JSON.stringify(store)
    })
  })

module.exports = router