const http = require('http')
const createHandler = require('github-webhook-handler')
const { exec } = require('child_process')

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
  exec('./deploy.sh', function(error, stdout, stderr) {
    if (error) {
      console.error('exec error: '+error)
      return
    }
    console.log('stdout: '+stdout)
    console.log('stderr: '+stderr)
  })
})

server.listen(7777, function () {
  console.log('webhook is open')
})