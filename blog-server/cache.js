const redis = require('redis')
const { cache: { port } } = require('./config')
const bluebird = require('bluebird')
const client = redis.createClient('6379')

client.on('error', err => {
  logger.error('redis连接失败', { err: err.stack })
})

client.on('connect', () => {
  logger.info('redis已经连接')  
})

client.on('reconnect', () => {
  logger.info('redis已经重新连接')    
})

module.exports = {
  get(key) {
    return new Promise ((resolve, reject) => {
      client.get(key, (err, res) => {
        err && reject(err)
        resolve(res)
      })
    })
  },
  set(key, value) {
    return client.set(key, value)
  },
  flush: client.flushdb.bind(client)
}