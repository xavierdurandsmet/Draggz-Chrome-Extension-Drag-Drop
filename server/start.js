// Load the http module to create an http server.
var http = require('http');
var router = require('./routes')

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(router);
// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);
server.on('request', router);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");