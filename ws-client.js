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

  var expect = function(param, toBe) {
    ws.on('message', function(payload) {
      var message = JSON.parse(payload)
      var assert = message[param] === toBe
      if (!assert) {
        console.log ('Expected ' + param
        + ' to be ' + toBe + ' but was ' + message[param] )
      }
      else {
        console.log ('Identify test passed')
      }

      ws.removeAllListeners('message')

      next()
    })
  }

  var identifyTest = ['type', 'identify', function() {
    send({
      type: 'identify',
      id: 'a2VuZ3JvZW5uQGdtYWlsLmNvbQ=='
    })
  }]

  var secondIdentifyTest = ['success', false, function() {
    send({
      type: 'identify',
      id: 'a2VuZ3JvZW5uQGdtYWlsLmNvbQ=='
    })
  }]

  var tests = [identifyTest, secondIdentifyTest]
  var next = function() {
    runTests()
  }

  var runTest = function(test) {
    expect(test[0], test[1])
    test[2]()
  }

  var runTests = function() {
    if (tests.length > 0) {
      var test = tests.shift()
      runTest(test)
    }
  }

  runTests()

  ws.on('close', function() {
    console.log('closed!')
  })

})
