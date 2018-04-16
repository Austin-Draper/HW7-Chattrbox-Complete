/*global require:true*/
/*eslint no-undef: "error"*/
var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = [];

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");
  //either socket.send(topic) here or immediately after "forEach" socket.send below
  topic.forEach(function(msg) {
    socket.send("*** Topic is '" + msg + "'");
  }); //semicolon

  messages.forEach(function(msg) {
    socket.send(msg);
  }); //semicolon

  socket.on("message", function(data) {
    console.log("message received: " + data);

    if (data.substring(0, 6) === "/topic") {
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send("*** Topic has changed to '" + data.substring(7, data.length) + "'");
      });
      topic[0] = data.substring(7, data.length);
      data = "";
    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data);
      });
    }
  });
});
