'use strict';

var vows = require('vows')
  ,assert = require('assert')
  ,events = require('events')
  ,echos = require('../lib/echos')
  ;

vows.describe('server').addBatch({
  'when an echo request is received': {
    'and we want the server to log': {
      topic: function() {
        var port = 19999
          ,promise = new(events.EventEmitter)()
          ;

        // Create server
        echos.server.start({port: port, callback: function(data, server) {
          server.close();
          promise.emit('success', data);
        }});

        // Send request to server
        echos.client.echo('Hello World!', {port: port, callback: function() {}});
 
        return promise;
      }

      ,'the server should log out data': function(topic) {
        var data = topic.split('\n');

        assert.equal(data[0], 'Echo message received:');
        assert.equal(data[1], '\tHello World!');
        assert.equal(data[2], '\tFrom address: 127.0.0.1');
        assert.match(data[3], /^\tTime:.*/);
      }
    }

    ,'and we want the server to stay quiet': {
      topic: function() {
        var port = 199999
          ,promise = new(events.EventEmitter)()
          ;

        // Create server
        echos.server.start({port: port, quiet: true, callback: function(data, server) {

          server.close();
          promise.emit('success', data);
        }});

        // Send request to server
        echos.client.echo('Hello World!', {port: port, callback: function() {}});

        return promise;
      }

      ,'the server shouldn\'t log out data': function(topic) {
        assert.isEmpty(topic);
      }
    }
  }
}).export(module);