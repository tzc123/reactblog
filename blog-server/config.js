const path = require('path')

module.exports = {
  server: {
    port: 4321,
    staticPath: path.join(__dirname, 'static'),
    staticOptions: {
      maxage: 7776000000,
      immutable: true
    }
  },
  database: {
    uri: process.env.NODE_ENV == 'production' 
         ? 'mongodb://tzc123:129315tzc@localhost:27017/reactblog?authSource=admin' 
         : 'mongodb://localhost:27017/reactblog'
  },
  session: {
    key: 'kkeeyy',
    httpOnly: true
  }
}