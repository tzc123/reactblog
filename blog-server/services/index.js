const ArticleModel = require('../models/article')
const BrowseModel = require('../models/browse')
const md5 = require('md5')
const cache = require('../cache')
const config = require('../config')
const hex = /[0-9A-Fa-f]{6}/

async function flush() {
  let res = false
  try {
    const browses = await cache.hgetall('browse')
    if (typeof browses == 'object' || browses != null) {
      const keys = Object.keys(browses)
      for(key of keys) {
        await BrowseModel.setBrowse(key, browses[key])
      }
    }
    res = await cache.flush()
  } catch (err) {
    logger.error('flush', { err: err.stack })
    return false
  }
  return res
}

function simpleAuth(ctx, secret) {
  const { request: { url, method } } = ctx
  if (md5(secret) != config.secret) {
    logger.info('无权限', { url, method, secret })          
    ctx.body = {
      success: false,
      message: '无权限'
    }
    return false
  }
  return true
}

function unknownError(ctx, err) {
  const { request: { url, method } } = ctx
  logger.error('未知错误', { url, method, err: err.stack })
  ctx.body = {
    success: false,
    message: '未知错误'
  }
}

function checkId(ctx, id) {
  const { request: { url, method } } = ctx
  if (!hex.test(id)) {
    logger.error('非法id', { url, method })
    ctx.body = {
      success: false,
      message: '非法id'
    }
    return false
  }
  return true
}

module.exports = {
  flush,
  simpleAuth,
  unknownError,
  checkId
}