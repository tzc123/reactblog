const path = require('path')
const origins = ['http://122.152.205.25', 'http://122.152.205.25:2333', 'http://122.152.205.25:4321']
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
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true, 
    signed: true,
    rolling: false, 
    renew: false 
  },
  secret: 'b946de9eb0fde32fa158f3749de92dc8',
  cors: {
    origin: process.env.NODE_ENV == 'production'
            ? function (request) {
                const { origin } = request.header
                // for (let _origin of origins) {
                //   if (_origin == origin) {
                //     return origin
                //   }
                // }
                // return ''
                return origin || 'http://122.152.205.25:4321'
              }
            : 'http://localhost:8080',
    credentials: true,
    methods: ['GET', 'POST']
  }
}