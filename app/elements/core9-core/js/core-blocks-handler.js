if(typeof PAGEMODE != 'undefined' && PAGEMODE == 'demo') {} else {
  document.body.style.opacity = "0";
}
try {
  var showAjaxLoader = {
    action: 'showAjaxLoader'
  }
  Core9.iframe.child.sentMessageToParent(showAjaxLoader);
} catch(e) {}
if(!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
Object.size = function (obj) {
  var size = 0,
    key;
  for(key in obj) {
    if(obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function isEmpty(str) {
  return(!str.trim() || 0 === str.trim()
    .length);
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
    account: {},
    theme: {},
    page: "page"
  },
  paths: {
    blocks: "/dashboard/data/accounts/{0}/blocks/",
    bower: "/dashboard/data/accounts/{0}/blocks/bower.json",
    demoFile: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/index.html",
    template: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/tpl/hbs/templates.html",
    formSteps: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/config/steps.json",
    formStepsDirectory: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/",
    defaultBlockData: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/data/default.json",
    //userDataById: "/dashboard/data/accounts/{0}/sites/pages/{1}/versions/{2}/data/{3}.json",
    globalData: "/dashboard/data/accounts/{0}/sites/{1}/global-data/",
    save: {
      preSave: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/tpl/js/actions/pre-save.js",
      postSave: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/tpl/js/actions/post-save.js"
    }
  }
}
Core9.blocks.handler.__registry = {
  blockIds: [],
  uniqueBlocks: [],
  blocks: {},
  availableBlocks: []
}
Core9.blocks.handler.events = function () {
  Core9.blocks.handler.events.onhover();
}
Core9.blocks.handler.events.onhover = function () {
  var blocks = Core9.blocks.handler.getBlocks();
  for(var i = 0; i < blocks.length; i++) {
    blocks[i].addEventListener('contextmenu', function (e) {
      if(typeof contextmenu !== 'undefined' && contextmenu == false) {
        return;
      }
      var userData = Core9.blocks.handler.__registry.blocks[e.currentTarget.dataset.id].loadedUSERDATA;
      var globalData = Core9.blocks.handler.__registry.blocks[e.currentTarget.dataset.id].loadedGLOBALDATA;
      var size = Object.size(globalData);
      if(size > 0) {
        userData = globalData;
      }
      var message = {
        block: {
          id: e.currentTarget.dataset.id,
          type: e.currentTarget.dataset.type,
          account: Core9.blocks.handler.config.account,
          theme: Core9.blocks.handler.config.theme,
          page: store.get('page')
            .toLowerCase(),
          pageDataDirectory: store.get('page-data-directory')
            .toLowerCase(),
          globalDataDirectory: store.get('global-data-directory')
            .toLowerCase(),
          defaultData: Core9.blocks.handler.__registry.blocks[e.currentTarget.dataset.id].loadedDEFAULTDATA,
          userData: userData,
          globalData: Core9.blocks.handler.__registry.blocks[e.currentTarget.dataset.id].loadedGLOBALDATA,
          formData: Core9.blocks.handler.__registry.blocks[e.currentTarget.dataset.id].loadedSTEPS
        },
        action: 'showPageForm',
        message: 'You tried to open context menu says parent'
      }
      try {
        Core9.iframe.child.sentMessageToParent(message);
      } catch(e) {}
      e.preventDefault();
    }, false);
  }
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
        "loadedCSS": {},
        "loadedJS": {},
        "loadedDEFAULTDATA": {},
        "loadedUSERDATA": {},
        "loadedGLOBALDATA": {},
        "loadedSTEPS": {}
      };
    }
    if(blocks.length == Object.keys(Core9.blocks.handler.__registry.blocks)
      .length) {
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
  return Core9.blocks.handler.j(Core9.blocks.handler.paths.template.format(Core9.blocks.handler.config.account, block.type)
    .toLowerCase(), "document");
}
Core9.blocks.handler.getTemplateDemoFile = function (block) {
  return Core9.blocks.handler.j(Core9.blocks.handler.paths.demoFile.format(Core9.blocks.handler.config.account, block.type)
    .toLowerCase(), "document");
}
Core9.blocks.handler.getFormSteps = function (block) {
  return Core9.blocks.handler.j(Core9.blocks.handler.paths.formSteps.format(Core9.blocks.handler.config.account, block.type)
    .toLowerCase());
}
Core9.blocks.handler.getDefaultBlockData = function (block) {
  return Core9.blocks.handler.j(Core9.blocks.handler.paths.defaultBlockData.format(Core9.blocks.handler.config.account, block.type)
    .toLowerCase());
}
Core9.blocks.handler.userDataById = function (block) {
  //page-data-directory = "/dashboard/data/accounts/easydrain/sites/easydrain.nl_null-null/pages/test/versions/blue/data/"
  return Core9.blocks.handler.j(store.get('page-data-directory') + block.id + '.json'.toLowerCase());
  //return Core9.blocks.handler.j(Core9.blocks.handler.paths.userDataById.format(Core9.blocks.handler.config.account, page, version, block.id));
}
Core9.blocks.handler.getGlobalDataById = function (id) {
  return Core9.blocks.handler.j(store.get('global-data-directory') + id + '.json'.toLowerCase());
}
Core9.blocks.handler.setTemplateHtml = function (block, data) {
  Core9.blocks.handler.__registry.blocks[block.id].loadedHTML = data.currentTarget.response;
  Core9.blocks.handler.createHandleBarTemplate(block);
}
Core9.blocks.handler.getGlobalDataId = function (userData) {
  if(typeof userData.settings != 'undefined') {
    for(var i = 0; i < userData.settings.length; i++) {
      var setting = userData.settings[i];
      if(setting.key == "global") {
        return setting.value;
      }
    }
  }
  return false;
}
Core9.blocks.handler.setHandleBarTemplateContent = function (userData, defaultData, template, block) {
  var len = Object.keys(userData)
    .length;
  var content = {};
  // FIXME do some error handling here!!!!!!!
  if(len == 0 || Core9.blocks.handler.config.page == "theme") {
    content = template(defaultData);
  } else {
    content = template(userData);
  }
  Core9.blocks.handler.__registry.blocks[block.id].$blockref.innerHTML = content;
}
Core9.blocks.handler.createHandleBarTemplate = function (block) {
  var html = Core9.blocks.handler.__registry.blocks[block.id].loadedHTML;
  var elements = html.querySelectorAll('[data-role="block"]');
  var init = {};
  for(var i = 0; i < elements.length; i++) {
    var tpl = elements[i];
    if(tpl.id == 'init') {
      init = tpl;
    } else {
      Handlebars.registerPartial(tpl.id, tpl.innerText);
    }
  }
  var template = null;
  template = Handlebars.compile(init.innerText);
  Core9.blocks.handler.__registry.blocks[block.id].$blockref.innerHTML = "";
  var json = {};
  var defaultData = Core9.blocks.handler.__registry.blocks[block.id].loadedDEFAULTDATA;
  var userData = Core9.blocks.handler.__registry.blocks[block.id].loadedUSERDATA;
  // check if userData should be globalData
  var globalDataId = Core9.blocks.handler.getGlobalDataId(userData);
  if(globalDataId) {
    Core9.blocks.handler.useGlobalData(userData, defaultData, template, block, globalDataId);
  } else {
    Core9.blocks.handler.setHandleBarTemplateContent(userData, defaultData, template, block);
  }
}
Core9.blocks.handler.useGlobalData = function (userData, defaultData, template, block, globalDataId) {
  var promise = Core9.blocks.handler.getGlobalDataById(globalDataId);
  promise.then(function (data) {
    var data = JSON.parse(data.currentTarget.response);
    userData = data;
    Core9.blocks.handler.setGlobalBlockData(block, data);
    Core9.blocks.handler.setHandleBarTemplateContent(userData, defaultData, template, block);
  }, function (err) {
    console.log(err);
  });
}
Core9.blocks.handler.setDefaultBlockData = function (block, data) {
  Core9.blocks.handler.__registry.blocks[block.id].loadedDEFAULTDATA = JSON.parse(data.currentTarget.response);
}
Core9.blocks.handler.setGlobalBlockData = function (block, data) {
  Core9.blocks.handler.__registry.blocks[block.id].loadedGLOBALDATA = data;
}
Core9.blocks.handler.setFormSteps = function (block, data) {
  var steps = JSON.parse(data.currentTarget.response);
  var stepList = [];
  var fileList = [];
  for(var i = 0; i < steps.length; i++) {
    var step = steps[i];
    stepList.push(Core9.blocks.handler.j(Core9.blocks.handler.paths.formStepsDirectory.format(Core9.blocks.handler.config.account, block.type)
      .toLowerCase() + step.file));
    fileList.push(step.file.toLowerCase());
  }
  var newResult = {};
  Promise.all(stepList)
    .then(function (values) {
      for(var i = 0; i < values.length; i++) {
        var value = values[i];
        var file = steps[i].file;
        try {
          newResult[file] = JSON.parse(value.currentTarget.response);
        } catch(e) {
          newResult[file] = JSON.parse('{"error":"invalid json"}');
        }
      }
      Core9.blocks.handler.__registry.blocks[block.id].loadedSTEPS = newResult;
      Core9.blocks.handler.triggerBlockDataReady();
    });
}
Core9.blocks.handler.setUserDataById = function (block, data) {
  try {
    Core9.blocks.handler.__registry.blocks[block.id].loadedUSERDATA = JSON.parse(data.currentTarget.response);
  } catch(e) {
    Core9.blocks.handler.__registry.blocks[block.id].loadedUSERDATA = Core9.blocks.handler.__registry.blocks[block.id].loadedDEFAULTDATA;
  }
}
Core9.blocks.handler.setTemplateCssAndJs = function (block, data) {
  var html = data.currentTarget.response;
  var jsLinks = html.querySelectorAll('script[data-theme], script[data-role="block"]');
  var styleLinks = html.querySelectorAll('link[data-theme], link[data-role="block"]');
  Core9.blocks.handler.__registry.blocks[block.id].loadedCSS = {};
  Core9.blocks.handler.__registry.blocks[block.id].loadedCSS.block = [];
  Core9.blocks.handler.__registry.blocks[block.id].loadedJS = {};
  Core9.blocks.handler.__registry.blocks[block.id].loadedJS.block = [];
  for(var i = 0; i < styleLinks.length; i++) {
    var link = styleLinks[i];
    if(link.dataset.theme == "block") {
      Core9.blocks.handler.__registry.blocks[block.id].loadedCSS.block[i] = link;
    } else {
      Core9.blocks.handler.__registry.blocks[block.id].loadedCSS[link.dataset.theme] = link;
    }
  }
  for(var i = 0; i < jsLinks.length; i++) {
    var link = jsLinks[i];
    if(link.dataset.theme == "block") {
      Core9.blocks.handler.__registry.blocks[block.id].loadedJS.block[i] = link;
      $.getScript(link.src, function () {});
    } else {
      Core9.blocks.handler.__registry.blocks[block.id].loadedJS[link.dataset.theme] = link;
      $.getScript(link.src, function () {});
    }
  }
  if(typeof PAGEMODE === 'undefined') {
    //return false;
    setTimeout(function () {
      for(var i = 0; i < Core9.blocks.handler.__registry.blocks[block.id].loadedCSS.block.length; i++) {
        var style = Core9.blocks.handler.__registry.blocks[block.id].loadedCSS.block[i];
        var blocktype = "style-" + block.type + "-" + i;
        try {
          style.dataset.blocktype = blocktype;
        } catch(e) {}
        if($(document)
          .find("[data-blocktype='" + blocktype + "']")
          .length == 0) {
          $('head')
            .append(style);
        }
      }
      for(var i = 0; i < Core9.blocks.handler.__registry.blocks[block.id].loadedJS.block.length; i++) {
        var script = Core9.blocks.handler.__registry.blocks[block.id].loadedJS.block[i];
        if(typeof script != 'undefined') {
          var blocktype = "script-" + block.type + "-" + i;
          script.dataset.blocktype = blocktype;
          if($(document)
            .find("[data-blocktype='" + blocktype + "']")
            .length == 0) {
            $('head')
              .append(script);
          }
        }
      }
      //$('head').append(Core9.blocks.handler.__registry.blocks[block.id].loadedJS.block);
      try {
        $('head')
          .append(Core9.blocks.handler.__registry.blocks[block.id].loadedCSS[Core9.blocks.handler.config.account.theme]);
        $('head')
          .append(Core9.blocks.handler.__registry.blocks[block.id].loadedJS[Core9.blocks.handler.config.account.theme]);
      } catch(e) {}
      //console.log("adding blocks");
      //FIXME this won't run if no blocks in template
      document.body.style.opacity = "1";
      try {
        var showAjaxLoader = {
          action: 'hideAjaxLoader'
        }
        Core9.iframe.child.sentMessageToParent(showAjaxLoader);
      } catch(e) {}
    }, 3000);
  }
}
Core9.blocks.handler.getBlockData = function (block) {
  var promiseList = [];
  promiseList.push(Core9.blocks.handler.getDefaultBlockData(block));
  promiseList.push(Core9.blocks.handler.userDataById(block));
  promiseList.push(Core9.blocks.handler.getTemplateHtml(block));
  promiseList.push(Core9.blocks.handler.getTemplateDemoFile(block));
  promiseList.push(Core9.blocks.handler.getFormSteps(block));
  Promise.all(promiseList)
    .then(function (values) {
      //console.log('values for block ' + block.type + ' id : ' + block.id)
      // we can trust the order of the results
      // http://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values
      //console.log(values);
      Core9.blocks.handler.setDefaultBlockData(block, values[0]);
      Core9.blocks.handler.setUserDataById(block, values[1]);
      Core9.blocks.handler.setTemplateHtml(block, values[2]);
      Core9.blocks.handler.setTemplateCssAndJs(block, values[3]);
      Core9.blocks.handler.setFormSteps(block, values[4]);
    });
}
Core9.blocks.handler.getData = function () {
  // carefull not chained
  Core9.blocks.handler.filRegistry()
    .then(function () {
      for(var i = 0; i < Core9.blocks.handler.__registry.blockIds.length; i++) {
        var id = Core9.blocks.handler.__registry.blockIds[i];
        var block = Core9.blocks.handler.getBlockById(id);
        Core9.blocks.handler.getBlockData(block);
      }
    }, function (err) {
      console.log(err);
    });
  Core9.blocks.handler.getBowerData()
    .then(function (result) {
      var json = JSON.parse(result.currentTarget.response);
      var blocks = json.dependencies;
      Object.keys(blocks)
        .forEach(function (key) {
          Core9.blocks.handler.__registry.availableBlocks.push(key);
        });
    }, function (err) {
      console.log(err);
    });
}
Core9.blocks.handler.j = function (url, responseType) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest;
    xhr.addEventListener("error", reject);
    xhr.addEventListener("load", resolve);
    xhr.open("GET", url);
    if(responseType) {
      xhr.responseType = "document";
    }
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
  var blocks = document.querySelectorAll(".core9-block");
  return blocks;
}
Core9.blocks.handler.preAndPostSaving = function (action) {
  //console.log('prepare save..');
  var blocks = Core9.blocks.handler.__registry.blocks;
  //console.log(blocks);
  var scriptArray = [];
  for(var blockObj in blocks) {
    if(!blocks.hasOwnProperty(blockObj)) continue;
    var block = blocks[blockObj];
    if($.inArray(block.type, scriptArray) == -1) {
      scriptArray.push(block.type);
    } else {
      continue;
    }
    var script = Core9.blocks.handler.paths.save[action].format(Core9.blocks.handler.config.account, block.type);
    try {
      $.getScript(script, function () {});
    } catch(e) {
      console.log(e);
    }
    //console.log(script);
  }
}
var RUNNED_INIT = false;
Core9.blocks.handler.init = function (account, theme) {
  //mycanvas
  if(document.querySelector('#mycanvas')) {
    Core9.blocks.handler.config.page = "theme";
  }
  //if(document.querySelector('#gm-canvas')) {
    //Core9.blocks.handler.config.page = "theme";
  //}
  if(typeof account == 'undefined' && typeof theme == 'undefined') {
    account: store.get('account');
    theme: store.get('theme');
  }
  Core9.blocks.handler.config.account = store.get('account');
  Core9.blocks.handler.config.theme = store.get('theme');
  Core9.blocks.handler.getData();
  if(!RUNNED_INIT) {
    Core9.blocks.handler.events();
    RUNNED_INIT = true;
  }
}
setTimeout(function () {
  if(typeof session == 'undefined') {
    var session = {
      account: store.get('account'),
      theme: store.get('theme')
    }
  }
  Core9.blocks.handler.init(session.account, session.theme);
}, 3000);
