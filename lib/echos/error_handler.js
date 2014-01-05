'use strict';

module.exports = {
  setup: function(socket) {
    socket.on('error', function(error) {
      switch (error.code) {
        case 'EADDRINUSE':
          console.log('Error: Port is in use.');
          break;
        case 'ECONNREFUSED':
          console.log('Error: Connection to server refused.');
          break;
        default:
          console.log('Unkown error occurred: ' + error.code);
          break;
      }
    });
  }
};