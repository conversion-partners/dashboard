var express = require('express');
var app = express();



app.use('/dashboard', express.static('.'));

///dashboard/data/accounts/easydrain/themes/bower_components/core9-theme-ess/templates/pages/Home/versions/blue/index.html

app.use('/dashboard/data/accounts/.*', express.static('.'));


//app.get('*', function (req, res) {
  //res.redirect('/dashboard');
//});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
