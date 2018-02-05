const mongoose = require('mongoose')
const { database: { uri } } = require('./config/index')

mongoose.connect(uri)
const db = mongoose.connection

db.on('open', () => {
  console.log('db connected!')
})
db.on('error', () => {
  console.log('db failed to connect!')
})