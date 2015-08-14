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
    blocks: "/dashboard/data/accounts/{0}/blocks/",
    bower: "/dashboard/data/accounts/{0}/blocks/bower.json",
    template: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/tpl/index.html",
    formSteps: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/steps/steps.json",
    defaultBlockData: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/data/default.json",
    userDataById: "/dashboard/data/accounts/{0}/sites/pages/{1}/versions/{2}/data/{3}.json"
  }
}
Core9.blocks.handler.__registry = {
  blockIds: [],
  uniqueBlocks: [],
  blocks: {},
  availableBlocks: []
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
      Core9.blocks.handler.__registry.blocks[block.dataset.id] = {
        "id": block.dataset.id,
        "type": block.dataset.type,
        "$blockref": block,
        "loadedHTML": {},
        "loadedDEFAULTDATA": {},
        "loadedUSERDATA": {},
        "loadedSTEPS": {}
      };
    }
    if(blocks.length == Object.keys(Core9.blocks.handler.__registry.blocks).length) {
      Core9.blocks.handler.__registry.blockIds = idArray;
      Core9.blocks.handler.__registry.uniqueBlocks = Core9.blocks.handler.deDupeArray(typesArray);
      resolve(Core9.blocks.handler.__registry);
    } else {
      reject(Error("It broke"));
    }
  });
}
Core9.blocks.handler.getBowerData = function () {
  return Core9.blocks.handler.j(Core9.blocks.handler.paths.bower.format(Core9.blocks.handler.config.account));
}
Core9.blocks.handler.getTemplateHtml = function (block) {
  return Core9.blocks.handler.j(Core9.blocks.handler.paths.template.format(Core9.blocks.handler.config.account, block.type));
}
Core9.blocks.handler.getFormSteps = function (block) {
    return Core9.blocks.handler.j(Core9.blocks.handler.paths.formSteps.format(Core9.blocks.handler.config.account, block.type));
}
Core9.blocks.handler.getDefaultBlockData = function (block) {
  return Core9.blocks.handler.j(Core9.blocks.handler.paths.defaultBlockData.format(Core9.blocks.handler.config.account, block.type));
}
Core9.blocks.handler.userDataById = function (block, page, version, id) {
  return Core9.blocks.handler.j(Core9.blocks.handler.paths.userDataById.format(Core9.blocks.handler.config.account, page, version, id));
}
Core9.blocks.handler.getBlockData = function (block) {
  var promiseList = [];
  promiseList.push(Core9.blocks.handler.getTemplateHtml(block));
  promiseList.push(Core9.blocks.handler.getDefaultBlockData(block));
  promiseList.push(Core9.blocks.handler.getFormSteps(block));
  Promise.all(promiseList).then(function (values) {
    console.log('values for block ' + block.type + ' id : ' + block.id)
    // we can trust the order of the results
    // http://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values
    console.log(values);
  });
}
Core9.blocks.handler.getData = function () {
  // carefull not chained
  Core9.blocks.handler.filRegistry().then(function () {
    for(var i = 0; i < Core9.blocks.handler.__registry.blockIds.length; i++) {
      var id = Core9.blocks.handler.__registry.blockIds[i];
      var block = Core9.blocks.handler.getBlockById(id);
      Core9.blocks.handler.getBlockData(block);
    }
  }, function (err) {
    console.log(err);
  });
  Core9.blocks.handler.getBowerData().then(function (result) {
      var json = JSON.parse(result.currentTarget.response);
      var blocks = json.dependencies;
      Object.keys(blocks).forEach(function (key) {
        Core9.blocks.handler.__registry.availableBlocks.push(key);
      });
  }, function (err) {
    console.log(err);
  });
}
Core9.blocks.handler.j = function (url) {
  console.log('url : ' + url);
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest;
    xhr.addEventListener("error", reject);
    xhr.addEventListener("load", resolve);
    xhr.open("GET", url);
    xhr.send(null);
  });
}
Core9.blocks.handler.getBlockById = function (id) {
  return Core9.blocks.handler.__registry.blocks[id];
}
Core9.blocks.handler.Handlebars = function () {
  if(typeof Handlebars == 'undefined') {
    alert('no handlebars found');
  }
  return Handlebars;
}
Core9.blocks.handler.deDupeArray = function (a) {
  var temp = {};
  for(var i = 0; i < a.length; i++) temp[a[i]] = true;
  var r = [];
  for(var k in temp)
    if(k != 'undefined') r.push(k);
  return r;
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
