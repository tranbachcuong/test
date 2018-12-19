var express = require('express')
var path = require("path")
var favicon = require('serve-favicon')
var app = express()
const helmet = require('helmet')
const sixtyDaysInSeconds = 5184000

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(favicon(path.join(__dirname + '/public/images/favicon.png')))
// Http security headers
app.disable('x-powered-by')
app.use(helmet.xssFilter())	// Sets "X-XSS-Protection: 1; mode=block"
app.use(helmet.hsts({ maxAge: sixtyDaysInSeconds }))	// Sets "Strict-Transport-Security" header
app.use(helmet.noCache())	// Set header Cache-Control and Pragma to turn-off client-side caching
app.use(helmet.noSniff())	// Sets "X-Content-Type-Options: nosniff"
app.use(helmet.frameguard({ action: 'sameorigin' }))	// Sets "X-Frame-Options: SAMEORIGIN"

app.get('/', function(request, response) {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
