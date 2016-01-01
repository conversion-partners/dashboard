var webdriverio = require('webdriverio');
var login = require('/var/www/dashboard/webdriver/scripts/modules/login/login.js');
var options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};
var client = webdriverio.remote(options);
client.addCommand("login", login.getFunction.bind(client));
client.init().url('http://localhost:9090/dashboard/').login('test').saveScreenshot('./webdriver/images/screenshots/snapshot.png', function (err, screenshot, response) {}).title(function (err, res) {
  console.log('Title was: ' + res.value);
}).end();
