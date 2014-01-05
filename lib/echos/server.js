'use strict';

module.exports = (function(){
  var net = require('net');

  return {
    start: function(opts) {
      var server = net.createServer();

      server.listen(opts.port);

      server.on('connection', function(socket) {
          // Message received
          socket.on('data', function(data) {
            var string = data.toString();

            // Send message back
            socket.write(string);

            if (!opts.quiet) {
              console.log('Echo message received:');
              console.log('\t' + string);
              console.log('\tFrom address: ' + socket.remoteAddress);
              console.log('\tTime: ' + new Date().toDateString());
            }
          });
      });

      // Setup error listener
      require('./error_handler.js').setup(server);

      return server;
    }
  };
})();