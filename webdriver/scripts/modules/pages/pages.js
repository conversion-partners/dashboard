


  module.exports = {
    getFunction: function () {
      /*
      arguments
      */
      return this.execute(function () {
          var iframe = document.querySelector("#panel-iframe-menu > iframe")
            .contentWindow;

          iframe.eval('$("a:contains(\'Pages\')").trigger("click");');

          var template = "";
          var language = "";
          var country = "";

          iframe.eval('$(".template-data").select2("val", "easydrain.nl");');
          iframe.eval('$(".language-data").select2("val", "");');
          iframe.eval('$(".country-data").select2("val", "");');
          iframe.eval('$("#refresh-templates").click();');
          iframe.eval('function getLink(n){return $("#nestable > ol > li").filter(function(){var t=$(this).find("span").context.innerText.trim();return t=t.substring(0,t.length-4),t==n?(console.log("'"+n+"'"),console.log("'"+t+"'"),$(this)):void 0})}');
          /*
          function getLink(link) {
           return  $("#nestable > ol > li")
              .filter(function () {
                var tmp = $(this)
                  .find("span")
                  .context.innerText.trim();
                tmp = tmp.substring(0, tmp.length - 4);

                if(tmp == link) {
                  console.log("'" + link + "'");
                  console.log("'" + tmp + "'");
                  return $(this);
                }
              });
          }
          */

          iframe.eval('var id = getLink('home')[0].dataset.id;');
          iframe.eval('Core9.data.currentid = id;');
          iframe.eval('document.getElementById("delpage").dataset.currentid = id;');
          iframe.eval('activateEditor();');
          iframe.eval('$("#editpage").click();');
          iframe.eval('$("#edit-selected-theme").click();');



          /*
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
