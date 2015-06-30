var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
	port: process.env.PORT || 8080
});

server.ext('onRequest', function(request, reply){
	console.log('Request received: ' + request.path);
	reply.continue();
});

server.route({
	path: '/',
	method: 'GET',
	handler: {
		file: './public/index.html'
	}
});

server.route({
	path: '/{path*}',
	method: 'GET',
	handler: {
		directory: {
			path: './public',
			listing: false
		}
	}
});

server.start(function(){
	console.log('Listening on: ' + server.info.uri);
});
