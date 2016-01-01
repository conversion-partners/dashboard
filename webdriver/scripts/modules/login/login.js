// tools.js
// ========
module.exports = {
  getName: function () {
    return "login";
  },
  getFunction: function () {
    console.log(arguments);
    console.log(this);
  }
};
