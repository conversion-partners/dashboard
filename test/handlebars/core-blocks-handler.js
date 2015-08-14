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
  config: {
    account : {},
    theme : {}
  },
  paths: {
    blocks: "/dashboard/test/handlebars/blocks/",
    bower: "/dashboard/test/handlebars/blocks/bower.json",
    template: "/dashboard/test/handlebars/blocks/usermessage/tpl/index.html",
    defaultData: "/dashboard/test/handlebars/blocks/usermessage/data/usermessage-testid.json"
  }
}
Core9.blocks.handler.__registry = {
  blockIds: [],
  uniqueBlocks: [],
  blocks: []
}
Core9.blocks.handler.filRegistry = function () {
  return new Promise(function (resolve, reject) {
    var blocks = Core9.blocks.handler.getBlocks();
    var typesArray = [];
    var idArray = [];
    for(var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      idArray.push(block.dataset.id);
      typesArray.push(block.dataset.type);
      Core9.blocks.handler.__registry.blocks.push({
        "id": block.dataset.id,
        "type": block.dataset.type,
        "$blockref": block,
        "loadedHTML": {},
        "loadedDEFAULTDATA": {},
        "loadedUSERDATA": {},
        "loadedSTEPS": {}
      });
    }
    if(blocks.length == Core9.blocks.handler.__registry.blocks.length) {
      Core9.blocks.handler.__registry.blockIds = idArray;
      Core9.blocks.handler.__registry.uniqueBlocks = Core9.blocks.handler.deDupeArray(typesArray);
      resolve(Core9.blocks.handler.__registry);
    } else {
      reject(Error("It broke"));
    }
  });
}
Core9.blocks.handler.deDupeArray = function (a) {
  var temp = {};
  for(var i = 0; i < a.length; i++) temp[a[i]] = true;
  var r = [];
  for(var k in temp)
    if(k != 'undefined') r.push(k);
  return r;
}
Core9.blocks.handler.getTemplateHtml = function (block) {
  return new Promise(function (resolve, reject) {
    // for each block type get templates
    Core9.blocks.handler.j();
    if(true) {
      resolve("Stuff worked!");
    } else {
      reject(Error("It broke"));
    }
  });
}
Core9.blocks.handler.getFormSteps = function (block) {
  return new Promise(function (resolve, reject) {
    // for each block type get templates
    Core9.blocks.handler.j();
    if(true) {
      resolve("Stuff worked!");
    } else {
      reject(Error("It broke"));
    }
  });
}
Core9.blocks.handler.getJsonData = function (block) {
  return new Promise(function (resolve, reject) {
    // for each block id get default and user data
    Core9.blocks.handler.j();
    if(true) {
      resolve("Stuff worked!");
    } else {
      reject(Error("It broke"));
    }
  });
}
Core9.blocks.handler.getBlockById = function (id) {
  var blocks = Core9.blocks.handler.__registry.blocks;
  for(var i = 0; i < blocks.length; i++) {
    var block = null;
    if(blocks[i].id == id) {
      block = blocks[i];
      break;
    }
    return block;
  }
}
Core9.blocks.handler.getBlockData = function (block) {
  var promiseList = [];
  promiseList.push(Core9.blocks.handler.getTemplateHtml(block));
  promiseList.push(Core9.blocks.handler.getJsonData(block));
  promiseList.push(Core9.blocks.handler.getFormSteps(block));
  Promise.all(promiseList).then(function (values) {
    console.log(values);
  });
}
Core9.blocks.handler.getData = function () {
  Core9.blocks.handler.filRegistry().then(function () {
    for(var i = 0; i < Core9.blocks.handler.__registry.blocks.length; i++) {
      Core9.blocks.handler.getBlockData(Core9.blocks.handler.__registry.blocks[i]);
    }
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
Core9.blocks.handler.init = function (account, theme) {
  Core9.blocks.handler.config.account = account;
  Core9.blocks.handler.config.theme = theme;
  Core9.blocks.handler.getData();
}
Core9.blocks.handler.init(session.account, session.theme);
