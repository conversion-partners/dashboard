var webdriverio = require('webdriverio');
var login = require('./modules/login/login.js');
var menu = require('./modules/menu/menu.js');
var page = require('./modules/pages/pages.js');
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
client.addCommand("menu", menu.getFunction.bind(client));
client.addCommand("page", page.getFunction.bind(client));
client.init()
  .url('http://localhost:9090/dashboard/')
  .execute('localStorage.setItem("account","")')
  .execute('localStorage.setItem("login","false")')
  .execute('localStorage.setItem("account","easydrain")')
  .execute('localStorage.setItem("login","true")')
  //.windowHandleMaximize("current")
  .pause(8000) // needs event handling
  .then(function () {
    //client.saveScreenshot('./webdriver/images/screenshots/snapshot.png', function (err, screenshot, response) {});
    //client.execute('return localStorage.getItem(arguments[0])', 'account')
    //  .then((value) => console.log('storageKey = ' + JSON.stringify(value)));
    client.element('#panel-login > iframe', function (err, res) {
      return client.login(err, res)
        .then(function () {
          console.log(arguments);
          return client.menu(arguments);
        })
        .then(function () {
          console.log(arguments);
          return client.page(arguments);
        })
        .then(function () {
          console.log(arguments);

          setTimeout(function(){
            client.execute('$("#export-page").click();');
          }, 8000);
        });
    });
  });
