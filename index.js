/*global require:true*/
/*global filePath:true*/
/*global __dirname:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[wws]" }]*/
var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var path = require("path");
var mime = require("mime");
var wss = require("./websockets-server");

var handleError = function(err, res) {
  res.writeHead(404);
  //MAKE AN ERROR PAGE.HTML AND TELL THE USER A 404 ERROR HAS OCCURRED
  var fileName = "error.txt";
  filePath = path.resolve(__dirname, "app", fileName);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      console.log(filePath);
      res.end(data);
    }
  });
};
var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      console.log(filePath);
      res.setHeader("Content-Type", mime.getType(filePath));
      res.end(data);
    }
  });
});
server.listen(3000);
