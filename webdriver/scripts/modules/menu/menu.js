
module.exports = {
  getFunction: function () {
    /*
    arguments
    */
    return this.execute(function () {
        var iframe = document.querySelector("#panel-iframe-menu > iframe")
          .contentWindow;
          /*
        iframe.eval('document.querySelector("#user-email").value = "asdfsdf";');
        iframe.eval('console.log(document.querySelector("#user-email").value);');
        iframe.eval('document.querySelector("#user-pw").value = "asdfsdf";');
        iframe.eval('console.log(document.querySelector("#user-pw").value);');
        iframe.eval('document.getElementsByClassName("sumbit")[0].click();');
        */
        var result = iframe.eval("document.title;");
        return result;
      }, null)
      .then(function (ret) {
        //console.log(ret.value);
        return ret;
      });
  }
};
