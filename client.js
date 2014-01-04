var net = require('net')
	,port = 7
	,host = '127.0.0.1'
	,socket = new net.Socket()
	;

socket.connect(port, host);
socket.on('connect', function() {
    socket.write('ping\r\n');
});
socket.on('data', function(data) {
	console.log(data.toString());
	socket.end();
});