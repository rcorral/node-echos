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
            var string = data.toString()
              ,_return = ''
              ;

            // Send message back
            socket.write(string);

            if (!opts.quiet) {
              _return = [
                'Echo message received:'
                ,'\t' + string
                ,'\tFrom address: ' + socket.remoteAddress
                ,'\tTime: ' + new Date().toDateString()
              ].join('\n');

              if (opts.callback && typeof opts.callback === 'function') {
                opts.callback(_return, server);
              } else {
                console.log(_return);
              }
            } else if (opts.callback && typeof opts.callback === 'function') {
              opts.callback(_return, server);
            }
          });
      });

      // Setup error listener
      require('./error_handler').setup(server);

      return server;
    }
  };
})();