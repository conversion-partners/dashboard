var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data



app.post('/api/file/:action', function (req, res) {
  console.log(req);

  console.log('body: ' + JSON.stringify(req.body));

  console.log(req.body);
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
