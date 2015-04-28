var http = require('http');
var request = require('request');
var qs = require('querystring');
var PORT = process.env.PORT || 6969;

var server = http.createServer(function (req, res) {
  var body = '';
  req.on('data', function (data){
    body += data;
  });
  req.on('end', function () {
    var reqData = qs.parse(body);
    request('https://rawgit.com/makenova/' + reqData.hash + '/raw/', function (err, response, body) {
      var result = eval('var input ="' + reqData.input + '";' + body);
      res.writeHead(200, {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.end(JSON.stringify({result:result}));
    });
  });
});

server.listen(PORT);