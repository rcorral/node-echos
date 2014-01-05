'use strict';

// Declare vars
var net = require('net')
  ,server = net.createServer()
  // Setup and get arguments
  ,optimist = require('optimist')
    .usage('Usage: $0 -p,--port <port> -q,--quiet')
    .options('p', {alias: 'port', default: 1024})
    .options('q', {alias: 'quiet', default: false})
  ,argv = optimist.argv
  ,port = argv.p
  ,quiet = argv.q
  ;

if (parseInt(port, 10).toString() === 'NaN') {
  optimist.showHelp();
  return;
}

server.listen(port);
server.on('connection', function(socket) {
  // Message received
    socket.on('data', function(data) {
      var string = data.toString();

      // Send message back
      socket.write(string);

      if (!quiet) {
        console.log('Echo message received:');
        console.log('\t' + string);
        console.log('\tFrom address: ' + socket.remoteAddress);
        console.log('\tTime: ' + new Date().toDateString());
      }
    });
});

server.on('error', function(error) {
  switch (error.code) {
    case 'EADDRINUSE':
      console.log('Error: Port is in use.');
      break;
    default:
      console.log('Unkown error occurred: ' + error.code);
      break;
  }
});