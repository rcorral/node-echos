echos [![Build Status](https://secure.travis-ci.org/rcorral/node-echos.png)](http://travis-ci.org/rcorral/node-echos)
=====

Echos is a simple echo server and client. More specifically, echos allows you to setup an echo server that will replay any text sent to it.
Echos also comes with a client that allows you to send an echo request to a server, and it will print it back.

Installation
============
####Global
``` bash
$ npm install -g echos
```

####Local
``` bash
$ npm install echos
```

Usage – Command line
====================

Server
------

    Usage: echos server -p,--port <port> -q,--quiet
    Usage: echos-server -p,--port <port> -q,--quiet

    Options:
      -p, --port   [default: 1024]
      -q, --quiet  [default: false]

Client
------
    Usage: echos client message -p,--port <port> -h,--host <host>
    Usage: echos-client message -p,--port <port> -h,--host <host>

    Options:
      -p, --port       [default: 1024]
      -h, --host       [default: "127.0.0.1"]
      -t, --timestamp  [default: false]

Example
-------

Running the server on port ``1337``  
``` bash
$ echos server -p 1337
```

Run the client to connect to the server on port ``1337`` and send ``Hello World!``  
``` bash
$ echos client Hello World! -p 1337 -t
```

When the server receives an echo request from the client it will log out something like this:  
```
Echo message received:
    Hello World!
    From address: 127.0.0.1
    Time: Sat Jan 04 2014
```

After the client receives the echo response from the server it will log out something like this:  
```
Hello World! time=7ms
```

Usage – As a module
===================

Initialize
----------
``` js
var echos = require('echos');
```

Create server
-------------
``` js
echos.server.start({port: 1337, quiet: false, callback: function(data){}});
```

Send echo from client
---------------------
``` js
echos.client.echo('Hello World!', {port: 1337, timestamp: true, callback: function(data){}});
```

Run in development
==================

Requirements
------------
1. Install node and npm
2. Install grunt-cli - http://gruntjs.com/getting-started

Install package requirements
----------------------------
1. Run ``npm install`` in the root of the repo

Watch for file changes, run grunt from the root of the repo. This will lint and run tests.  
``` bash
$ grunt watch
```

Run Tests
=========
``` bash
$ npm test
```