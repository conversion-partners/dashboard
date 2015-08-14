if(!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
if(typeof Core9 === 'undefined') {
  Core9 = {}
};
"use strict";
if(typeof Core9.blocks === 'undefined') {
  Core9.blocks = {}
};
Core9.blocks.handler = {}
Core9.blocks.handler = {
  paths: {
    "blocks": "/dashboard/test/handlebars/blocks/"
  }
}
Core9.blocks.handler.getData = function () {
  Core9.blocks.handler.filRegistry().then(function (result) {
    console.log(result);
    return Core9.blocks.handler.getTemplateHtml(result);
  }, function (err) {
    console.log(err);
  });
}
Core9.blocks.handler.j = function (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest;
    xhr.addEventListener("error", reject);
    xhr.addEventListener("load", resolve);
    xhr.open("GET", url);
    xhr.send(null);
  });
}
Core9.blocks.handler.__registry = []
Core9.blocks.handler.filRegistry = function () {
  return new Promise(function (resolve, reject) {
    var blocks = Core9.blocks.handler.getBlocks();
    for(var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      Core9.blocks.handler.__registry.push({
        "id": block.dataset.id,
        "type": block.dataset.type
      });
    }
    if(blocks.length == Core9.blocks.handler.__registry.length) {
      resolve(Core9.blocks.handler.__registry);
    } else {
      reject(Error("It broke"));
    }
  });
}
Core9.blocks.handler.Handlebars = function () {
  if(typeof Handlebars == 'undefined') {
    alert('no handlebars found');
  }
  return Handlebars;
}
Core9.blocks.handler.triggerBlockDataReady = function () {
  var event = new Event('blockdataready');
  document.body.dispatchEvent(event);
}
Core9.blocks.handler.getBlocks = function () {
  return document.querySelectorAll(".core9-block");
}
Core9.blocks.handler.getFormSteps = function () {}
Core9.blocks.handler.getJsonData = function () {}
Core9.blocks.handler.getTemplateHtml = function (listOfBlocks) {
  return Core9.blocks.handler.j('/dashboard/test/handlebars/blocks/usermessage/tpl/index.html');
}

Core9.blocks.handler.init = function () {
  Core9.blocks.handler.getData();
}
Core9.blocks.handler.init();
