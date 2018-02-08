const mongoose = require('mongoose')
const { database: { uri } } = require('./config/index')

mongoose.connect(uri)
const db = mongoose.connection

db.on('open', () => {
  logger.info('db connected')
})
db.on('error', () => {
  logger.error('db failed to connect')
})