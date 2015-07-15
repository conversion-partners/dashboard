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

app.post('/api/file/:action', function(req, res) {

  $ = cheerio.load(req.body.content);


  $('.row').each(function(){
    //console.log(this);
    var columns = this.children;
    for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        console.log("column :");
        console.log(column);
        console.log("classes :");
        try {
          console.log(column.attribs.class);
        } catch (e) {

        }

    }

  });




  $('.core9-block').remove();

  // removes comments
  $('*').contents().each(function() {
    if (this.nodeType == 8) {
      $(this).remove()
    }
  });


  fs.writeFile(".." + req.body.template, $.html(), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

  console.log(__dirname);
  console.log(req.body.template);
  res.send(req.originalUrl);
});





app.use('/dashboard', express.static('.'));

app.use('*', function(req, res) {
  res.redirect('/dashboard/');
});


var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
