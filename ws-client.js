var WebSocket = require('ws')
, Getopt = require('node-getopt')
, getopt = new Getopt([
  ['u', 'url=']
  ])
, opt = getopt.parse(process.argv)
, url = opt.options.url


var ws = new WebSocket(url)


ws.on('open', function() {

  var send = function(message) {
    var payload = JSON.stringify(message)
    ws.send(payload)
  }


  ws.on('message', function(payload) {
    var message = JSON.parse(payload)

    console.log(payload)

  })

  send({
    type: 'identify',
    id: 'a2VuZ3JvZW5uQGdtYWlsLmNvbQ==',
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  })


  ws.on('close', function() {
    console.log('closed!')
  })

})
