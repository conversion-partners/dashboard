if (typeof Core9 === 'undefined') {
  Core9 = {}
};



Core9.blocks = function() {}
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

Core9.blocks.insertBlock = function(block, columnDiv, callback) {
  callback(block, columnDiv);
}

Core9.blocks.init = function() {
  var data = {
    template: "/dashboard/data/accounts/easydrain/themes/bower_components/core9-theme-ess/templates/pages/home/versions/blue/index.html"
  };
  //console.log(data.template);
  var dataJson = Core9.blocks.__getDataJsonFromTemplate(data.template);
  //console.log(dataJson);

  Core9.blocks.__getJSON(dataJson, function(json) {
    //console.log(json);
    var blocks = json.blocks;
    var rows = document.getElementsByClassName('row');

    for (var row = 0; row < rows.length; row++) {
      var columns = rows[row].getElementsByClassName("column");
      for (var column = 0; column < columns.length; column++) {
        var columnDiv = columns[column];
        console.log(columnDiv);

        try {
          console.log("row :" + row);
          console.log("column : " + column);
          console.log();
          var block = blocks[row][column];
          Core9.blocks.emptyElement(columnDiv);
          console.log(block);
          Core9.blocks.insertBlock(block, columnDiv, function(block, columnDiv) {
            var html = "<div class='core9-block'>" + block.block + "</div>";
            columnDiv.appendChild(Core9.blocks.convertStringToHtml(html));
          })
        } catch (e) {

        }

      }
    }

  });



}

Core9.blocks.init();
