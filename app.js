var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.post('/api/io/:action', function(req, res) {
  switch (req.params.action) {
    case 'save':
      fs.writeFile(".." + req.body.file, req.body.content, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
      break;
    default:
      console.log(req);
  }
});

app.use('/dashboard/', express.static('.'));

app.use('/*', function(req, res) {
  res.redirect('/dashboard/');
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
