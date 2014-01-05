'use strict';

// Declare vars
var net = require('net')
  ,client = new net.Socket()
  // Setup and get arguments
  ,optimist = require('optimist')
    .usage('Usage: $0 message -p,--port <port> -h,--host <host>')
    .options('p', {alias: 'port', default: 1024})
    .options('h', {alias: 'host', default: '127.0.0.1'})
    .options('t', {alias: 'timestamp', default: false})
  ,argv = optimist.argv
  ,message = argv._.join(' ')
  ,port = argv.p
  ,timestamp = argv.t
  ,host = argv.h
  ,start_time = new Date()
  ;

if (message === undefined || message.length === 0 || parseInt(port, 10).toString() === 'NaN') {
  console.log('Invalid usage.');
  optimist.showHelp();
  return;
}

client.connect(port, host);
client.on('connect', function() {
  // On connect send our message
    client.write(message);
});

client.on('data', function(data) {
  var end_date = new Date()
    ,time_difference = ''
    ,min, sec, mill
    ;

  // Figure out how long the round trip took
  if (timestamp) {
    time_difference = end_date.getTime() - start_time.getTime();

    // Get milliseconds
    mill = time_difference % 1000;
    time_difference -= mill;

    if (time_difference > 0) {
      time_difference /= 1000;
      min = parseInt(time_difference / 60, 10);
      sec = time_difference % 60;
    }

    time_difference = ' time=' +
      (min ? min + 'm ' : '') +
      (sec ? sec + 's ' : '') +
      (mill ? mill + 'ms' : '');
  }

  // In message receive log message
  console.log(data.toString() + time_difference);

  client.end();
});

client.on('error', function(error) {
  switch (error.code) {
    case 'ECONNREFUSED':
      console.log('Error: Connection to server refused.');
      break;
    default:
      console.log('Unkown error occurred: ' + error.code);
      break;
  }
});