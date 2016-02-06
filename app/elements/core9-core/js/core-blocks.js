if (typeof Core9 === 'undefined') {
  Core9 = {}
};
"use strict";
if (typeof Core9.blocks === 'undefined') {
  Core9.blocks = {}
};

Core9.blocks.hasClass = function (element, classname) {
  return(' ' + element.className + ' ').indexOf(' ' + classname + ' ') > -1;
}
Core9.blocks.guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
Core9.blocks.addBlock = function (block) {
  var div = document.createElement("div");
  div = Core9.blocks.insertBlock(div, block);
  try {
    var delElem = document.querySelector('.gm-editing-selected .gm-content');
    delElem.parentNode.removeChild(delElem);
  } catch(e) {
    console.log(e);
  }
  gm.appendHTMLSelectedCols(div.innerHTML);
}
Core9.blocks.getAllBlocks = function () {
  return document.querySelectorAll('.core9-block');
}
Core9.blocks.getUniqueId = function () {
  var blocks = Core9.blocks.getAllBlocks();
  var id = Core9.blocks.guid();
  var unique = true;
  for(var i = 0; i < blocks.length; i++) {
    if(blocks[i].id == id){
      unique = false;
    }
  }
  if(unique){
    return id;
  }else{
    return Core9.blocks.getUniqueId();
  }
}
Core9.blocks.insertBlock = function (div, block) {
  if(typeof div === 'undefined') return;
  //Core9.blocks.getUniqueId
  //			<div data-role="block" class="core9-block" data-type="image" data-respond data-id="testid1"></div>
  var id = block +'-'+ Core9.blocks.getUniqueId();
  var html = "<div data-id='" +id +"' data-type='" + block + "' data-respond  class='core9-block' data-role='block'>" + block + "</div>";
  var c = document.createComment("gm-editable-region");
  div.appendChild(c);
  div.appendChild(Core9.blocks.convertStringToHtml(html));
  var c = document.createComment("/gm-editable-region");
  div.appendChild(c);
  return div;
}
Core9.blocks.init = function () {
  //console.log('running init');
  var blocks = document.getElementsByClassName('core9-block');
  Core9.blocks.loopBlocks(blocks);
}
Core9.blocks.loopBlocks = function (blocks) {
  for(var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    //console.log(block);
    block.appendChild(document.createTextNode(block.dataset.type));
  }
}
Core9.blocks.emptyElementsByClass = function (doc, className) {
  var elements = doc.getElementsByClassName(className);
  for(var i = 0; i < elements.length; i++) {
    Core9.blocks.emptyElement(elements[i]);
  }
  return doc;
}
Core9.blocks.save = function (data) {
  var url = data.url;
  var html = Core9.blocks.convertStringToWrappedDom(data.data.content);
  var rows = html.querySelectorAll('.row');
  var content = Core9.blocks.emptyElementsByClass(html, "core9-block").innerHTML;
  $.ajax({
    type: "POST",
    url: url + 'save',
    data: {
      content: content,
      file: data.data.template,
      account: data.data.account
    }
  });
}
Core9.blocks.__getDir = function (path) {
  return path.substring(0, path.lastIndexOf("/") + 1);
}
Core9.blocks.emptyElement = function (node) {
  while(node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
Core9.blocks.convertStringToWrappedDom = function (string) {
  var d = document.createElement('div');
  d.innerHTML = string;
  return d;
}
Core9.blocks.convertStringToHtml = function (string) {
  var d = document.createElement('div');
  d.innerHTML = string;
  return d.firstChild;
}
Core9.blocks.init();
