


  module.exports = {
    getFunction: function () {
      /*
      arguments
      */
      return this.execute(function () {
          var iframe = document.querySelector("#panel-pages > iframe")
            .contentWindow;

          iframe.eval('$("a:contains(\'Pages\')").trigger("click");');

          var template = "";
          var language = "";
          var country = "";

          setTimeout(function(){

                    iframe.eval('$(".template-data").select2("val", "easydrain.nl");');
                    iframe.eval('$(".language-data").select2("val", "");');
                    iframe.eval('$(".country-data").select2("val", "");');
                    iframe.eval('$("#refresh-templates").click();');
                    iframe.eval('function getLink(n){return $("#nestable > ol > li").filter(function(){var t=$(this).find("span").context.innerText.trim();return t=t.substring(0,t.length-4),t==n?(console.log(n),console.log(t),$(this)):void 0})}');
                    var test = 'home';
                    iframe.eval('var page = "'+test+'";');
                    iframe.eval('var id = getLink("home")[0].dataset.id;');
                    iframe.eval('Core9.data.currentid = id;');
                    iframe.eval('document.getElementById("delpage").dataset.currentid = id;');
                    iframe.eval('activateEditor();');
                    iframe.eval('$("#editpage").click();');
                    iframe.eval('$("#edit-selected-theme").click();');

          }, 3000);

          var result = iframe.eval("document.title;");
          return result;
        }, null)
        .then(function (ret) {
          //console.log(ret.value);
          return ret;
        });
    }
  };
