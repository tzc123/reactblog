const BrowseModel = require('../models/browse')
const cache = require('../cache')

async function getBrowses() {
  let browses = await cache.hgetall('browse')
  if (typeof browses != 'object' || browses == null) {
    try {
      browses = {}
      const newBrowses = await BrowseModel.getBrowses()
      newBrowses.forEach(browse => {
        browses[browse.id] = browse.browse
      })
      await cache.hmset('browse', browses)
    } catch (err) {
      logger.error('getBrowses', { err: err.stack })
      return {}
    }
  } 
  return browses
}

async function getBrowse(id) {
  let browse = await cache.hget('browse',id)
  if (+browse == NaN) {
    try {
      browse = (await BrowseModel.getBrowse(id)).browse
      await cache.hset('browse', id, +browse + 1)
    } catch (err) {
      logger.error('getBrowse', { id, err: err.stack })
      return 0
    }
  }
  return browse
}

async function setBrowse(id) {
  let res = false
  try {
    res = await cache.hincrby('browse', id, 1)
  } catch (err) {
    logger.error('browse', { id, err: err.stack })      
    return false
  }
  return res
}

module.exports = {
  getBrowses,
  getBrowse,
  setBrowse
}