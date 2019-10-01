const http = require('http');
const fs = require('fs');
var url = require('url');
// var mysql = require('mysql');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  var q = url.parse(req.url, true);

  if(q.pathname === '/') {
    var filename = __dirname + "/../index.html";  
  } else {
    var filename = __dirname + "/.." + q.pathname;
  }

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    res.writeHead(200);
    res.write(data);
    res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});