'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var storyFolder = '/stories/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/../build'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../build/index.html');
});

app.post('/', function(req, res) {
  var storySelected = req.body.storyChoice;
  res.sendFile(__dirname + storyFolder + storySelected + '.json');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
