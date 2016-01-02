var webdriverio = require('webdriverio');
var login = require('./modules/login/login.js');
var options = {
  desiredCapabilities: {
    //browserName: 'chrome'
    browserName: 'phantomjs'
  }
  //capabilities: [{
  //browserName: 'phantomjs',
  //'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--ssl-protocol=tlsv1', '--web-security=false', '--debug=false', '--disk-cache=true']
  //}]
};
var client = webdriverio.remote(options);
client.addCommand("login", login.getFunction.bind(client));
client.init()
  .url('http://localhost:9090/dashboard/')
  .execute('localStorage.setItem("account","")')
  .execute('localStorage.setItem("login","false")')
  //.windowHandleMaximize("current")
  .pause(8000) // needs event handling
  .then(function () {
    client.saveScreenshot('./webdriver/images/screenshots/snapshot.png', function (err, screenshot, response) {});
    client.execute('return localStorage.getItem(arguments[0])', 'account')
      .then((value) => console.log('storageKey = ' + JSON.stringify(value)));
    client.element('#panel-login > iframe', function (err, res) {
      return client.login(err, res)
        .then(function (res) {
          console.log(res);
          return res;
        })
        .then(function (res) {
          console.log('if false then we are logged in or something\'s gone wrong..'); // fix this!!
          console.log(res);
        });
    });
  });
