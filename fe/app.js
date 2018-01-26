const express = require('express')
const url = require('url')
const _ = require('lodash')
const app = express()

app.use(express.static('static'))

const log = function() {
  console.log.apply(console, arguments)
}

const sendHtml = function(path, response) {
  const fs = require('fs')
  const options = {
    encoding: 'utf-8',
  }
  fs.readFile(path, options, function(err, data) {
    response.send(data)
  })
}

app.get('/', function(request, response) {
  const path = 'index.html'
  sendHtml(path, response)
})

const apiOption = function() {
  // set api_server=http://10.10.30.22:5000
  const serverFromEnv = process.env.api_server
  const defaultServer = 'http://10.10.30.22:5000'
  let apiServer
  if (serverFromEnv) {
    apiServer = serverFromEnv
  } else {
    apiServer = defaultServer
  }

  const apiOption = Object.assign({
    headers: {
      'Content-Type': 'application/json',
    }
  }, url.parse(apiServer))

  if (apiOption.href) {
    delete apiOption.href
  }

  return apiOption
}

app.get('/api/*', function(request, response) {
  const options = apiOption()
  Object.assign(options, {
    path: request.url,
  })
  options.method = request.method
  const http = require('http')

  log('debug options', options)
  const r = http.request(options, function(resp) {
    _.each(resp.headers, function(v, k) {
      response.setHeader(k, v)
    })
    resp.on('data', function(data) {
      response.write(data)
    })
    resp.on('end', function() {
      response.end()
    })
    resp.on('error', function() {
      console.error(`error to request: ${request.url}`)
    })
  })

  r.on('error', function() {
    console.error(`failed to request: ${request.url}`)
  })

  if (options.method !== 'GET') {
    const body = JSON.stringify(request.body)
    log('body', body)
    r.write(body)
  }

  r.end()
})

const server = app.listen(8000, function() {
  const address = server.address()
  const host = address.address
  const port = address.port
  log(`应用实例，访问地址为 http://${host}:${port}`)
})