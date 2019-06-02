var http = require('http');

var server = http.createServer((function(request, response) {
    response.writeHead(200, {'Contente-Type': 'text/plain'});
    response.end('Hello World\n');
}));

server.listen(7000);