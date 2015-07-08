var express = require('express');
var app = express();


//app.use('/dashboard/data/accounts/.*', express.static('.'));


app.use('/dashboard/api/file*', function (req, res) {
  console.log(req);
  res.send(req.originalUrl);
});


app.use('/dashboard', express.static('.'));

///dashboard/data/accounts/easydrain/themes/bower_components/core9-theme-ess/templates/pages/Home/versions/blue/index.html




app.use('*', function (req, res) {
  res.redirect('/dashboard');
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
