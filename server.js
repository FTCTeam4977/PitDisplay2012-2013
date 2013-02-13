var http = require('http');
var io = require("socket.io");
var nodestatic = require("node-static");
var staticServer = new nodestatic.Server(".");
var server = http.createServer(function handler(req, res){
	staticServer.serve(req,res);
});

io = io.listen(server);


io.sockets.on('connection', function (socket) {
	socket.on("addMatch", function (data) 
	{
		console.log("Sent event");
		console.log(data);
		socket.broadcast.emit('addMatch', data);
   });
}
);


server.listen(8080)