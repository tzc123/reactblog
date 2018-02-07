const http = require('http')
const createHandler = require('github-webhook-handler')

const handler = createHandler({ path: '/', secret: '129315' })
const server = http.createServer((req, res) => {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})

server.listen(7777, function () {
  console.log('webhook is open')
})