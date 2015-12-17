var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var mime = require('mime');
var mkdirp = require('mkdirp');
var path = require('path');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


//app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));

var bodyParser = require('body-parser');
app.use(bodyParser({limit: '200kb'}));
//app.use(bodyParser.json({limit: '1500kb'}));
//app.use(bodyParser.urlencoded({limit: '1500kb', extended: true}));




app.post('/api/io/:action', function (req, res) {
  switch(req.params.action) {
  case 'save':
    //var onlyPath = require('path').dirname('G:\node-demos\7-node-module\demo\config.json');
    var file = ".." + req.body.file;
    var directory = path.dirname(file);
    mkdirp(directory, function (err) {
      fs.writeFile(file, req.body.content, function (err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    });
    break;
  default:
    console.log(req);
  }

  res.sendStatus(200);

});
app.use('/dashboard/data/accounts/:account/themes/bower_components/:theme/templates/pages/:page/versions/:version/index.html', function (req, res) {
  console.log(this);
  var p = req.params;
  var defaultGridFile = '../dashboard/data/accounts/' + p.account + '/themes/bower_components/' + p.theme + '/templates/pages/default-grid.html';
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
          res.end();
        }
      });
      //return console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});
app.use('/dashboard/', express.static('.'));
//app.use('/dashboard/', express.static('.'));

app.use('/*', function (req, res) {
  //res.redirect('/dashboard/');
  res.status(200)        // HTTP status 404: NotFound
   .send('');
});


var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
//var hostname = "localhost";//config.hostname;//"localhost";
console.log("config : ");
console.log(config);

var server = app.listen(3000, config.hostname, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
