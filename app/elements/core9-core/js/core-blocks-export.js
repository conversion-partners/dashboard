function removeIdsFromIframeContent(doc, idsToRemove) {
  for (i = 0; i < idsToRemove.length; i++) {
    var id = idsToRemove[i];
    try {
      var elem = doc.getElementById(id);
      elem.parentNode.removeChild(elem);
    } catch (err) {}

  }
}

Core9.exportPage = function() {

  var iframe = Core9.panel.getIframeById('panel-iframe-site');
  var doc = Core9.iframe.getContentAsDocument(iframe);

  var idsToRemove = ["js-boot", "js-boot-handler", "js-blocks", "js-child", "js-handlebars", "js-store", "css-demo", "css-bootstrap", "js-responsive-elements"];

  removeIdsFromIframeContent(doc, idsToRemove);

  var content = Core9.iframe.documentToString(doc);
  var url = '/api/io/save';
  var file = store.get('cached-file').toLowerCase();
  console.log(file);
  $.ajax({
    type: "POST",
    url: url,
    data: {
      content: content,
      file: file,
      account: store.get('account')
    },
    statusCode: {
      404: function() {
        alert("page not found");
      },
      200: function() {
        console.log("done 200 reset page");
      }
    }
  });

}

//export-page
document.getElementById("export-page").addEventListener("click", function() {
  var cachedFile = store.get('cached-file');
  if (typeof cachedFile != 'undefined') {
    Core9.exportPage();
  }


});
