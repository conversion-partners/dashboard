// tools.js
// ========
module.exports = {
  getFunction: function (err, res) {
    if(err) {
      return false;
    }
    console.log(err); //if err then we are already logged in.
    //console.log(arguments);
    //console.log(this);
    this.frame(res.value)
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
      .saveScreenshot('./webdriver/images/screenshots/snapshot.png', function (err, screenshot, response) {})
      .getHTML('head title')
      .then(console.log)
      .end();
  }
};
