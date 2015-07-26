if (typeof Core9 === 'undefined') {
  Core9 = {}
};



Core9.blocks = function() {}
Core9.blocks.hasClass = function(element, classname) {
  return (' ' + element.className + ' ').indexOf(' ' + classname + ' ') > -1;
}

Core9.blocks.insertBlock = function(div, block) {
  var html = "<div class='core9-block' data-type='" + block + "'>" + block + "</div>";
  var c = document.createComment("gm-editable-region");
  div.appendChild(c);
  div.appendChild(Core9.blocks.convertStringToHtml(html));
  var c = document.createComment("/gm-editable-region");
  div.appendChild(c);
}


Core9.blocks.init = function() {


  var data = {
    template: store.get('template') //"/dashboard/data/accounts/easydrain/themes/bower_components/core9-theme-ess/templates/pages/home/versions/blue/index.html"
  };
  var dataJson = Core9.blocks.__getDataJsonFromTemplate(data.template);
  Core9.blocks.__getJSON(dataJson, function(json) {
    var rows = document.getElementsByClassName('row');
    var db = json;

    console.log(rows);

    Core9.blocks.loop('init', rows, db);
  });

}


Core9.blocks.loop = function(action, rows, db) {
  var dbLoki = new loki('blocks');
  var blocks = dbLoki.addCollection('blocks')
  if (action == 'init') {
    for (var i = 0; i < db.length; i++) {
      blocks.insert(db[i]);
    }
  }
  var i = 0;
  if (action == 'init') {
    i = 1;
  }
  for (i; i < rows.length; i++) {
    var row = rows[i];
    for (var n = 0; n < row.children.length; n++) {
      var child = row.children[n];
      if (Core9.blocks.hasClass(child, 'column')) {
        var nestedChildren = child.children;
        for (var r = 0; r < nestedChildren.length; r++) {
          var grandChild = nestedChildren[r];

          var block = {};
          block.row = i;
          block.column = n;
          block.position = r;

          console.log('query : ');
          console.log(block);
          console.log(grandChild);


          if(action == 'init'){
            var result = blocks.find(block);
            console.log('result : ');
            console.log(result);
            if(result){
              var container = grandChild.children[block.position];
              Core9.blocks.insertBlock(container, result[0].block);
            }
          }

          if (!Core9.blocks.hasClass(grandChild, 'row')) {
            if (Core9.blocks.hasClass(grandChild, 'core9-block') && action == 'save') {
              block.block = grandChild.dataset.type;
                db.push(block);
            } else {
              // native block
            }
          }


        }
      }
    }
  }
  return db;
}

Core9.blocks.save = function(data) {
  var url = data.url;
  var html = Core9.blocks.convertStringToWrappedDom(data.data.content);
  var rows = html.querySelectorAll('.row');
  var db = [];

  db = Core9.blocks.loop('save', rows, db);

  console.log('database : ');
  console.log(db);

  $.ajax({
    type: "POST",
    url: url + 'save',
    data: {
      content: JSON.stringify(db),
      file: data.data.template.replace('index.html', 'data.json'),
      account: data.data.account
    }
  });

  function removeElementsByClass(doc, className) {
    var elements = doc.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].previousSibling.parentNode.removeChild(elements[0].previousSibling);
      elements[0].nextSibling.parentNode.removeChild(elements[0].nextSibling);
      elements[0].parentNode.removeChild(elements[0]);
    }
    return doc;
  }

  $.ajax({
    type: "POST",
    url: url + 'save',
    data: {
      content: removeElementsByClass(html, "core9-block").innerHTML,
      file: data.data.template,
      account: data.data.account
    }
  });


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
Core9.blocks.convertStringToWrappedDom = function(string) {
  var d = document.createElement('div');
  d.innerHTML = string;
  return d;
}
Core9.blocks.convertStringToHtml = function(string) {
  var d = document.createElement('div');
  d.innerHTML = string;
  return d.firstChild;
}






Core9.blocks.init();
