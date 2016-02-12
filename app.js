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
/** passport **/
var passport = require('passport');
var Strategy = require('passport-local')
  .Strategy;
var db = require('./db');
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(function (username, password, cb) {
  db.users.findByUsername(username, function (err, user) {
    if(err) {
      return cb(err);
    }
    if(!user) {
      return cb(null, false);
    }
    if(user.password != password) {
      return cb(null, false);
    }
    return cb(null, user);
  });
}));
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if(err) {
      return cb(err);
    }
    cb(null, user);
  });
});
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/panels/login/views');
app.set('view engine', 'ejs');
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
//app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
// Define routes.
app.get('/auth/', function (req, res) {
  res.render('home', {
    user: req.user
  });
});
app.get('/auth/login', function (req, res) {
  res.render('login');
});
app.post('/auth/login', passport.authenticate('local', {
  failureRedirect: '/auth/login'
}), function (req, res) {
  res.redirect('/auth/');
});
app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('/auth/');
});
app.get('/auth/profile', require('connect-ensure-login')
  .ensureLoggedIn(),
  function (req, res) {
    res.render('profile', {
      user: req.user
    });
  });
/** passport **/
var bodyParser = require('body-parser');
app.use(bodyParser({
  limit: '200kb'
}));
//app.use(bodyParser.json({limit: '1500kb'}));
//app.use(bodyParser.urlencoded({limit: '1500kb', extended: true}));
app.post('/api/io/:action', require('connect-ensure-login')
  .ensureLoggedIn(),
  function (req, res) {

    console.log(req);

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
app.use('/dashboard/data/accounts/:account/sites/:domain/global-data/get-data-items', require('connect-ensure-login')
  .ensureLoggedIn(),
  function (req, res) {
    console.log(this);
    var p = req.params;
    var globalDataDir = '../dashboard/data/accounts/' + p.account + '/sites/' + p.domain + '/global-data';
    var file = '..' + req.originalUrl;
    //var contentType = mime.lookup(file);
    // FIXME errorhandling
    res.writeHead(200, {
      "Content-Type": "application/json" //contentType
    });

    function getFiles(dir, files_, path) {
      files_ = files_ || [];
      var files = fs.readdirSync(dir);
      for(var i in files) {
        var name = dir + '/' + files[i];
        var noPath = files[i];
        if(fs.statSync(name)
          .isDirectory()) {
          getFiles(name, files_, path);
        } else {
          if(path) {
            files_.push(name);
          } else {
            files_.push(noPath);
          }
        }
      }
      return files_;
    }
    var fileArr = getFiles(globalDataDir, [], false);
    var globalData = [];
    for(var i = 0; i < fileArr.length; i++) {
      globalData.push(fileArr[i].replace('.json', ''));
    }
    res.write(JSON.stringify(globalData));
    res.end();
  });
app.use('/dashboard/data/accounts/:account/themes/bower_components/:theme/templates/pages/:page/versions/:version/index.html', require('connect-ensure-login')
  .ensureLoggedIn(),
  function (req, res) {
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
/**
app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });
**/
app.use('/dashboard/', require('connect-ensure-login')
  .ensureLoggedIn(), express.static('.'));
//app.use('/dashboard/', express.static('.'));
app.use('/*', function (req, res) {
  //res.redirect('/dashboard/');
  res.status(200) // HTTP status 404: NotFound
    .send('');
});
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
//var hostname = "localhost";//config.hostname;//"localhost";
console.log("config : ");
console.log(config);
var server = app.listen(3000, config.hostname, function () {
  var host = server.address()
    .address;
  var port = server.address()
    .port;
  console.log('Example app listening at http://%s:%s', host, port);
});
