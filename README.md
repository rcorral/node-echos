echos
=====

Echos is a simple echo server and client. More specifically, echos allows you to setup an echo server that will replay any text sent to it.
Echos also comes with a client that allows you to send an echo request to a server, and it will print it back.

Requirements
------------
1. Install node and npm
2. Install grunt-cli - http://gruntjs.com/getting-started

Install package requirements
----------------------------
1. Run ``npm install`` in the root of the repo

Usage – Command line
====================

Server
------

    Usage: ./echos server -p,--port <port> -q,--quiet
    Usage: ./echos-server -p,--port <port> -q,--quiet

    Options:
      -p, --port   [default: 1024]
      -q, --quiet  [default: false]

Client
------
    Usage: ./echos client message -p,--port <port> -h,--host <host>
    Usage: ./echos-client message -p,--port <port> -h,--host <host>

    Options:
      -p, --port       [default: 1024]
      -h, --host       [default: "127.0.0.1"]
      -t, --timestamp  [default: false]

Example
-------

Running the server on port ``1337``  
``` bash
./bin/echos server -p 1337
```

Run the client to connect to the server on port ``1337`` and send ``Hello World!``  
``` bash
./bin/echos client Hello World! -p 1337 -t
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
echos.server.start({port: 1337, quiet: false, callback: function(data) {console.log(data);}});
```

Send echo from client
---------------------
``` js
echos.client.echo('Hello World!', {port: 1337, timestamp: true, callback: function(data) {console.log(data);}});
```

Run in development
==================

Watch for file changes, run grunt from the root of the repo  
```
grunt watch
```

Run Tests
=========
``` bash
  $ npm test
```

#### License: MIT