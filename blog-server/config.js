const path = require('path')

module.exports = {
  server: {
    port: 4321,
    logPath: path.join(__dirname, 'logs/')
  },
  cache: {
    port: 6379
  },
  database: {
    uri: process.env.NODE_ENV == 'production' 
         ? 'mongodb://tzc123:129315tzc@localhost:27017/reactblog?authSource=admin' 
         : 'mongodb://localhost:27017/reactblog'
  },
  session: {
    key: 'kkeeyy',
    httpOnly: true
  },
  secret: '321czt'
}