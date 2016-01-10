function removeIdsFromIframeContent(doc, idsToRemove) {
  for(i = 0; i < idsToRemove.length; i++) {
    var id = idsToRemove[i];
    try {
      var elem = doc.getElementById(id);
      elem.parentNode.removeChild(elem);
    } catch(err) {}
  }
}

function getMetaContentByName(doc, name, content) {
  var content = (content == null) ? 'content' : content;
  //.querySelector("meta[name='description']");
  return doc.querySelector("meta[name='" + name + "']");
  //.getAttribute(content);
}

function setMetaDataOnIframeContent(doc, metaData) {
  doc.title = metaData.metadata.title;
  //console.log(metaData);
  var desc = getMetaContentByName(doc, "description");
  //console.log(desc);
  if(typeof desc != 'undefined') {
    desc.parentNode.removeChild(desc);
  }
  var meta = document.createElement('meta');
  meta.setAttribute('name', 'description');
  meta.setAttribute('content', metaData.metadata.metadescription);
  doc.getElementsByTagName('head')[0].appendChild(meta);
}
Core9.exportPage = function () {
    Core9.pageMetaData = JSON.parse(store.get('page-meta-data'));
    console.log(Core9.pageMetaData);
    var iframe = document.querySelector("#panel-iframe-site > iframe")
      .contentWindow;
    iframe.eval('Core9.blocks.handler.preAndPostSaving("preSave");');
    setTimeout(function () {
      var iframe = Core9.panel.getIframeById('panel-iframe-site');
      var doc = Core9.iframe.getContentAsDocument(iframe);
      var idsToRemove = ["js-boot", "js-boot-handler", "js-blocks", "js-child", "js-handlebars", "js-store", "css-demo", "css-bootstrap", "js-responsive-elements"];
      removeIdsFromIframeContent(doc, idsToRemove);
      setMetaDataOnIframeContent(doc, Core9.pageMetaData);
      var content = Core9.iframe.documentToString(doc);
      var url = '/api/io/save';
      var file = store.get('cached-file')
        .toLowerCase();
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
          404: function () {
            alert("page not found");
          },
          200: function () {
            console.log("done 200 reset page");
            var iframe = document.querySelector("#panel-iframe-site > iframe")
              .contentWindow;
            iframe.eval('Core9.blocks.handler.preAndPostSaving("postSave");');
            //document.getElementById("export-page")
            document.getElementById("export-page")
              .style.backgroundColor = "";
          }
        }
      });
    }, 3000);
  }
  //export-page
document.getElementById("export-page")
  .addEventListener("click", function () {
    document.getElementById("export-page")
      .style.backgroundColor = "green";
    var cachedFile = store.get('cached-file');
    if(typeof cachedFile != 'undefined') {
      Core9.exportPage();
    }
  });
