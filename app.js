var express = require('express');
var app = express();

app.all('/api/file/:action', function (req, res) {
  console.log(req);
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
