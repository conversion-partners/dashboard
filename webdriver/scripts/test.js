var webdriverio = require('webdriverio');
var login = require('./modules/login/login.js');
var options = {
  desiredCapabilities: {
    browserName: 'chrome'
      //browserName: 'phantomjs'
  }
};
var client = webdriverio.remote(options);
//client.addCommand("login", login.getFunction.bind(client));
client.init()
  .url('http://localhost:9090/dashboard/')
  //.windowHandleMaximize("current")
  .then(function () {
    setTimeout(function () {
      client.element('#panel-login > iframe', function (err, res) {
        client.frame(res.value)
          .execute(function (a, b, c, d) {
            document.querySelector('#user-email')
              .value = "asdfsdf";
            console.log(document.querySelector('#user-email')
              .value);
            document.querySelector('#user-pw')
              .value = "asdfsdf";
            console.log(document.querySelector('#user-pw')
              .value);
            //document.getElementsByClassName("simform")[0].submit();
            document.getElementsByClassName("sumbit")[0].click();
            // browser context - you may not access neither client nor console
            return a + b + c + d;
          }, 1, 2, 3, 4)
          .then(function (ret) {
            // node.js context - client and console are available
            console.log(ret.value); // outputs: 10
          })
          .setValue('#user-email', 'test123')
          .setValue('#user-pw', 'test123')
          .click('.sumbit')
          .getHTML('body')
          .then(console.log)
          .end();
      });
    }, 8000);
  });
