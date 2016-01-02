$(".template-data")
  .select2("val", "easydrain.com");
$(".language-data")
  .select2("val", "EN");
$(".country-data")
  .select2("val", "EN");
$("#refresh-templates")
  .click();

function getLink(link) {
  $("#nestable > ol > li")
    .filter(function () {
      var tmp = $(this)
        .find('span')
        .context.innerText.trim();
      tmp = tmp.substring(0, tmp.length - 4);
      console.log("'" + link + "'");
      console.log("'" + tmp + "'");
      if(tmp == link) {
        return $(this);
      }
    });
  return false;
}
var id = "2d5a400c-d9a2-e13a-decb-7b304beb02de";
Core9.data.currentid = id;
document.getElementById('delpage')
  .dataset.currentid = id;
activateEditor();
$('#editpage')
  .click();
$('#edit-selected-theme')
  .click();
