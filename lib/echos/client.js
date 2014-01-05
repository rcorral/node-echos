'use strict';

module.exports = (function(){
  var net = require('net');

  return {
    echo: function(message, opts) {
      var client = new net.Socket()
        ,start_time = new Date()
        ,that = this
        ;

      client.on('connect', function() {
        // On connect send our message
          client.write(message);
      });

      client.on('data', function(data) {
        var time_difference = ''
          ,_return = ''
          ;

        // Figure out how long the round trip took
        if (opts.timestamp) {
          time_difference = that.calculate_trip_time(start_time, new Date());
        }

        // Figure out how to display message
        _return = data.toString() + time_difference;
        if (opts.callback && typeof opts.callback === 'function') {
          opts.callback(_return);
        } else {
          console.log(_return);
        }

        client.end();
      });

      // Setup error listener
      require('./error_handler').setup(client);

      // Attempt to connect
      client.connect(opts.port, opts.host);

      return client;
    }

    /**
     * @param  start Object Date object for when the application was initiated
     * @param  end Object Date object, end time
     * @return String Returns formatted string of the time differences
     */
    ,calculate_trip_time: function(start, end) {
      var time_difference = end.getTime() - start.getTime()
        ,min, sec, mill
        ;

      // Get milliseconds
      mill = time_difference % 1000;
      time_difference -= mill;

      if (time_difference > 0) {
        time_difference /= 1000;
        min = parseInt(time_difference / 60, 10);
        sec = time_difference % 60;
      }

      return ' time=' +
        (min ? min + 'm ' : '') +
        (sec ? sec + 's ' : '') +
        (mill ? mill + 'ms' : '');
    }
  };
})();