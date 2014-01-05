'use strict';

var vows = require('vows')
  ,assert = require('assert')
  ,events = require('events')
  ,echos = require('../lib/echos')
  ;

vows.describe('client').addBatch({
  'when an echo request is sent': {
    'we should receive it back': {
      topic: function() {
        var port = 9999
          ,promise = new(events.EventEmitter)()
          ;

        // Create server
        echos.server.start({port: port, callback: function(data, server) {
          server.close();
        }});

        // Send request to server
        echos.client.echo('Hello World!', {port: port, callback: function(data) {
          promise.emit('success', data);
        }});
 
        return promise;
      }

      ,'by itself': function(topic) {
        assert.equal(topic, 'Hello World!');
      }
    }

    ,'and we want to know the round-trip': {
      topic: function() {
        var port = 99999
          ,promise = new(events.EventEmitter)()
          ;

        // Create server
        echos.server.start({port: port, callback: function(data, server) {
          server.close();
        }});

        // Send request to server
        echos.client.echo('Hello World!', {port: port, timestamp: true, callback: function(data) {
          promise.emit('success', data);
        }});

        return promise;
      }

      ,'the client should output the time it took for the round-trip': function(topic) {
        assert.match(topic, /^Hello World!\s*time=[0-9]+ms/);
      }
    }
  }
}).export(module);