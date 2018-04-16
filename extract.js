/*global require:true*/
/*global __dirname:true*/
/*eslint no-undef: 0*/
var path = require("path");
//const mime = require("mime");

var extractFilePath = function(url) {
  var filePath;
  var fileName = "index.html";
  if (url.length > 1) {
    fileName = url.substring(1);
    //console.log(mime.getType(fileName));
  }
  console.log("The fileName is: " + fileName);

  filePath = path.resolve(__dirname, "app", fileName);
  return filePath;
};

module.exports = extractFilePath;
