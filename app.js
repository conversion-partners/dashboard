var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var mime = require('mime');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.post('/api/io/:action', function (req, res) {
  switch(req.params.action) {
  case 'save':
    fs.writeFile(".." + req.body.file, req.body.content, function (err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
    break;
  default:
    console.log(req);
  }
});
app.use('/dashboard/data/accounts/:account/themes/bower_components/:theme/templates/pages/:page/versions/:version/index.html', function (req, res) {
  console.log(this);
  var p = req.param;
  var defaultGridFile = '/dashboard/data/accounts/' + p.account + '/themes/bower_components/' + p.theme + '/templates/pages/default-grid.html';
  var file = '..' + req.originalUrl;
  var contentType = mime.lookup(file);
  // FIXME errorhandling
  res.writeHead(200, {
    "Content-Type": contentType
  });
  fs.readFile(file, 'utf8', function (err, data) {
    if(err) {
      fs.readFile(defaultGridFile, 'utf8', function (err, data) {
        if(err) {
          return console.log(err);
        } else {
          res.write(data);
        }
      });
      return console.log(err);
    } else {
      res.write(data);
    }
    res.end();
  });
});
app.use('/dashboard/', express.static('.'));
app.use('/*', function (req, res) {
  res.redirect('/dashboard/');
});
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
