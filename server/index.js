var express = require("express");
var path = require("path");

var app = express();


app.get("/favorites", function(req, res) {
    res.end("hello...");
});

var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});