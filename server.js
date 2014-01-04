var net = require('net')
	,port = 7
	,server = net.createServer()
	;

server.listen(port);
server.on('connection', function(socket) {
    socket.on('data', function(data) {
    	socket.write(data.toString());
    });
});