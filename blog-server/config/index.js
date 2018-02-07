const path = require('path')

module.exports = {
  server: {
    port: 4321,
    staticPath: path.join(__dirname, '../static'),
    staticOptions: {
      maxage: 99999
    }
  },
  database: {
    uri: 'mongodb://localhost:27017/reactblog'
  },
  session: {
    key: 'kkeeyy',
    httpOnly: true
  }
}