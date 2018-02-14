const mongoose = require('mongoose')
const { database: { uri } } = require('./config')

mongoose.connect(uri)
const db = mongoose.connection

db.on('open', () => {
  logger.info('数据库已连接')
})
db.on('error', () => {
  logger.error('数据库连接失败')
})