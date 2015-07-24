if (typeof Core9 === 'undefined') {
  Core9 = {}
};



Core9.blocks = function() {}
Core9.blocks.save = function(data){
  var url = data.url;
  var html = Core9.blocks.convertStringToHtml(data.data.content);
  console.log(html);
}
Core9.blocks.__getDir = function(path) {
  return path.substring(0, path.lastIndexOf("/") + 1);
}
Core9.blocks.__getDataJsonFromTemplate = function(path) {
  return Core9.blocks.__getDir(path) + "data.json";
}
Core9.blocks.__getJSON = function(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var json = JSON.parse(xmlhttp.responseText);
      callback(json);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
Core9.blocks.emptyElement = function(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
Core9.blocks.convertStringToHtml = function(string) {
  var d = document.createElement('div');
  d.innerHTML = string;
  return d.firstChild;
}

Core9.blocks.insertBlock = function(progress, block, columnDiv, callback) {
  callback(progress, block, columnDiv);
}

Core9.blocks.init = function() {
  var data = {
    template:  store.get('template') //"/dashboard/data/accounts/easydrain/themes/bower_components/core9-theme-ess/templates/pages/home/versions/blue/index.html"
  };
  var dataJson = Core9.blocks.__getDataJsonFromTemplate(data.template);
  Core9.blocks.__getJSON(dataJson, function(json) {
    var blocks = json.blocks;
    var rows = document.getElementsByClassName('row');
    var nrRows = rows.length;
    for (var row = 0; row < nrRows; row++) {
      var columns = rows[row].getElementsByClassName("column");
      var nrColumns = columns.length;
      for (var column = 0; column < nrColumns; column++) {
        var columnDiv = columns[column];
        try {
          var progress = {
            "nrrows": nrRows,
            "row": row,
            "nrcolumns": nrColumns,
            "column": column
          }
          //console.log(blocks);
          var block = blocks[row][column];
          if (block) {
            Core9.blocks.insertBlock(progress, block, columnDiv, function(progress, block, columnDiv) {
              Core9.blocks.emptyElement(columnDiv);

              for (var i = 0; i < block.length; i++) {

                var html = "<div class='core9-block' data-type='" + block[i].block + "'>" + block[i].block + "</div>";
                var c = document.createComment("gm-editable-region");
                columnDiv.appendChild(c);
                columnDiv.appendChild(Core9.blocks.convertStringToHtml(html));
                var c = document.createComment("/gm-editable-region");
                columnDiv.appendChild(c);

              }


            });
          }
        } catch (e) {}

      }
    }
  });



}

Core9.blocks.init();
