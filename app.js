var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cheerio = require('cheerio');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data



app.post('/api/file/:action', function (req, res) {
  //console.log(req);

  //console.log('body: ' + JSON.stringify(req.body));

  $ = cheerio.load(req.body.content);
  $('#css-bootstrap').remove();
  $('#css-gridmanager').remove();
  $('#css-demo').remove();
  $('#css-fontawsome').remove();
  $('#js-store').remove();
  $('#js-jquery').remove();
  $('#js-jquery-ui').remove();
  $('#js-bootstrap').remove();
  $('#js-tinymce').remove();
  $('#js-jquery-tinymce').remove();
  $('#js-gridmanager').remove();
  $('#js-child').remove();
  $('#js-blocks').remove();
  $('#js-boot').remove();

/**
loadCss("css-bootstrap","/dashboard/app/elements/core9-gridmanager/demo/css/bootstrap.css");
//<link href="/dashboard/app/elements/core9-gridmanager/dist/css/jquery.gridmanager.css" rel="stylesheet">
loadCss("css-gridmanager","/dashboard/app/elements/core9-gridmanager/dist/css/jquery.gridmanager.css");
//<link href="/dashboard/app/elements/core9-gridmanager/demo/css/demo.css" rel="stylesheet">
loadCss("css-demo","/dashboard/app/elements/core9-gridmanager/demo/css/demo.css");
}

loadjscssfile("js-store", "/dashboard/bower_components/store-js/store.min.js", "js");
loadjscssfile("js-jquery", "/dashboard/app/elements/core9-gridmanager/demo/js/jquery.js", "js");
loadjscssfile("js-jquery-ui", "/dashboard/app/elements/core9-gridmanager/demo/js/jquery-ui.js", "js");
loadjscssfile("js-bootstrap", "/dashboard/app/elements/core9-gridmanager/demo/js/bootstrap.js", "js");
loadjscssfile("js-tinymce", "/dashboard/bower_components/tinymce/tinymce.min.js", "js");
loadjscssfile("js-jquery-tinymce", "/dashboard/bower_components/tinymce/jquery.tinymce.min.js", "js");
loadjscssfile("js-gridmanager", "/dashboard/app/elements/core9-gridmanager/dist/js/jquery.gridmanager.js", "js");
loadjscssfile("js-child", "/dashboard/app/elements/core9-core/js/iframe/child.js", "js");
loadjscssfile("js-blocks", "/dashboard/app/elements/core9-core/js/core-blocks.js", "js");
**/



  console.log($.html());
    //res.json(req.body);

  res.send(req.originalUrl);
});





app.use('/dashboard', express.static('.'));

app.use('*', function (req, res) {
  res.redirect('/dashboard/');
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
