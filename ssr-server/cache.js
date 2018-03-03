const redis = require('redis')
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
  set: client.set.bind(client),
  hset: client.hset.bind(client),
  hget(hashkey, key) {
    return new Promise((resolve, reject) => {
      client.hget(hashkey, key, (err, res) => {
        err && reject(err)
        resolve(res)
      })
    })
  },
  hgetall(hashkey) {
    return new Promise((resolve, reject) => {
      client.hgetall(hashkey, (err, res) => {
        err && reject(err)
        resolve(res)
      })
    })
  },
  exists: client.exists.bind(client),
  flush: client.flushdb.bind(client),
  hincrby: client.hincrby.bind(client)
}