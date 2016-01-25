if(!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
if(!Object.byString) {
  Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for(var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if(k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }
}
if(!Object.resolve) {
  Object.resolve = function (path, obj, safe) {
    return path.split('.')
      .reduce(function (prev, curr) {
        return !safe ? prev[curr] : (prev ? prev[curr] : undefined)
      }, obj || self)
  }
}
var isArray = function (val) {
  if(Object.prototype.toString.call(val) === '[object Array]') {
    return true;
  }
  return false;
}

function isEmpty(str) {
  return(!str.trim() || 0 === str.trim()
    .length);
}
if(typeof Core9 === 'undefined') {
  Core9 = {}
};
"use strict";
if(typeof Core9.forms === 'undefined') {
  Core9.blocks = {}
};
Core9.forms = {
  config: {
    account: {},
    theme: {},
    type: {},
    data: {
      newGlobalDataSetting: "",
      oldGlobalDataSetting: "",
      saveGlobalData: false,
      globalData: {},
      saveLocalData: false,
      localData: {},
      oldData: {},
      newData: {}
    }
  },
  paths: {
    blocks: "/dashboard/data/accounts/{0}/blocks/bower_components/",
    bower: "/dashboard/data/accounts/{0}/blocks/bower.json",
    template: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/tpl/hbs/templates.html",
    formSteps: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/config/steps.json",
    formFilter: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/filters/",
    formDirectory: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/",
    defaultBlockData: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/data/default.json",
    userDataById: "/dashboard/data/accounts/{0}/sites/pages/{1}/versions/{2}/data/{3}.json"
  }
}
Core9.forms.__registry = {
  blocks: {},
  data: {}
}
Core9.forms.getData = function (formData) {
  console.log('init form');
  console.log(formData);
  // check for global data if it exists load it
  var script;
  if(typeof formData == 'undefined') {
    return;
  } else {
    script = formData.value;
  }
  var schema = Core9.forms.__registry.data.block.formData[script];
  var data = {};
  data.userData = Core9.forms.__registry.data.block.userData;
  data.defaultData = Core9.forms.__registry.data.block.defaultData;
  Core9.forms.filterForm(script, schema, data);
}
Core9.forms.filterForm = function (script, schema, data) {
  var path = location.origin + Core9.forms.paths.formFilter.format(Core9.forms.config.account, Core9.forms.config.type) + 'form-data-organizer.js';
  var plugin = new jailed.Plugin(path);
  // called after the plugin is loaded
  var input = {
    script: script,
    schema: schema,
    data: data
  }
  var start = function () {
    plugin.remote.filter(input, reportResult);
  }
  var reportResult = function (result) {
    var schema = result.schema;
    var data = result.data.userData;
    result.formData = {};
    // then get data accociated with script
    var items = result.stepData[script];
    var obj = {};
    var len = items.length;
    for(var i = 0; i < len; i++) {
      var item = items[i];
      var scriptData = Object.resolve(item, data);
      var type = typeof scriptData;
      if(type != "string" && !isArray(scriptData)) {
        for(var key in scriptData) {
          if(scriptData.hasOwnProperty(key)) {
            obj[key] = scriptData[key];
          }
        }
      } else {
        // this sucks
        if(len == 1 && type == "object") {
          // this is needed for correct array forms
          obj = scriptData;
        } else {
          // this works with only one value per form
          obj[item] = scriptData;
        }
      }
    }
    result.formData[script] = obj;
    Core9.forms.loadForm(script, schema, result);
  }
  plugin.whenConnected(start);
}
Core9.forms.setDataListOnGlobalSettings = function (inputField) {
  console.log(inputField);
  inputField.attr('placeholder', "Loading options...");
  var dataList = document.createElement("DATALIST");
  dataList.id = 'global-data';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function (response) {
    if(request.readyState === 4) {
      if(request.status === 200) {
        var jsonOptions = JSON.parse(request.responseText);
        jsonOptions.forEach(function (item) {
          var option = document.createElement('option');
          option.value = item;
          dataList.appendChild(option);
          inputField.after(dataList);
        });
        inputField.attr('placeholder', "e.g. datalist");
      } else {
        inputField.attr('placeholder', "Couldn't load datalist options :(");
      }
    }
  };
  var dataDir = store.get("global-data-directory") + 'get-data-items';
  request.open('GET', dataDir, true);
  request.send();
}
Core9.forms.loadForm = function (script, schema, data) {
  var starting_value = data.formData[script];
  if(typeof Core9.editor === 'undefined') {
    Core9.editor = {}
  };
  try {
    Core9.editor.destroy();
    Core9.editor = {};
  } catch(e) {}
  Core9.editor = new JSONEditor(document.querySelector('#form-holder'), {
    ajax: true,
    startval: starting_value,
    disable_edit_json: true,
    disable_properties: true,
    format: 'grid',
    theme: 'bootstrap3',
    schema: schema
  });
  console.log(script);
  if(script == 'settings.json') {
    Core9.editor.watch('root.0.key', function () {
      console.log(this);
    });
    var value = jQuery("[name='root[0][value]']");
    value.attr('list', 'global-data');
    Core9.forms.setDataListOnGlobalSettings(value);
  }

  function onSave() {
    var script = $('#form-select')
      .val();
    if(isEmpty(script)) {
      alert('Please select a form');
      return;
    }
    data.action = "save";
    Core9.forms.saveForm(script, schema, data, Core9.editor.getValue());
  }
  $('label')
    .next('select')
    .hide();
  var saveButton = document.getElementById('save');
  saveButton.removeEventListener('click', onSave, false);
  saveButton.addEventListener('click', onSave, false);
}

function setValue(path, val, obj) {
  var fields = path.split('.');
  var result = obj;
  for(var i = 0, n = fields.length; i < n && result !== undefined; i++) {
    var field = fields[i];
    if(i === n - 1) {
      result[field] = val;
    } else {
      if(typeof result[field] === 'undefined' || !(typeof result[field] === 'object')) {
        result[field] = {};
      }
      result = result[field];
    }
  }
}
Core9.forms.checkIfGlobalDataExists = function (type, userData) {
  if(typeof userData.settings != 'undefined') {
    for(var i = 0; i < userData.settings.length; i++) {
      var setting = userData.settings[i];
      if(setting.key == "global") {
        //return setting.value;
        Core9.forms.config.data[type] = setting.value;
        return true;
      }
    }
  }
  return false;
}
Core9.forms.updateUserData = function (script, result, oldUserData, newUserData) {
  if(typeof newUserData != "string" && !isArray(newUserData)) {
    for(var key in newUserData) {
      if(newUserData.hasOwnProperty(key)) {
        var newValue = newUserData[key];
        var oldVal = Object.resolve(key, oldUserData);
        setValue(key, newValue, oldUserData);
      }
    }
  } else {
    // assume this is always a array and only one array per form.
    var keys = result.data.stepData[script];
    var key = keys[0];
    oldUserData[key] = [];
    for(var i = 0; i < newUserData.length; i++) {
      var newValue = newUserData[i];
      //var oldVal = Object.resolve(key, oldUserData);
      oldUserData[key][i] = newValue;
    }
  }
  return oldUserData;
}
Core9.forms.saveFormDataToUserRegistry = function (result) {
  /*
    Core9.forms.config.data...
  globalDataSetting: "",
  saveGlobalData: false,
  globalData: {},
  saveLocalData: false,
  localData: {},
  oldData: {},
  newData: {}
  */
  // check if global settings was in old data then save to global data else don't
  var script = result.script;
  var oldUserData = result.data.data.userData;
  var newUserData = result.formData;
  Core9.forms.config.data.oldData = result.data.data.userData;
  Core9.forms.config.data.newData = result.formData;
  // see if we need to save global
  var globalDataSettingInOldData = false;
  var globalDataSettingInNewData = false;
  if(script == "settings.json") {
    globalDataSettingInOldData = Core9.forms.checkIfGlobalDataExists("oldGlobalDataSetting", oldUserData);
    var settingData = {};
    settingData.settings = result.formData;
    globalDataSettingInNewData = Core9.forms.checkIfGlobalDataExists("newGlobalDataSetting", settingData);
  }
  Core9.forms.config.data.saveLocalData = true;
  if(globalDataSettingInOldData && !globalDataSettingInNewData) {
    Core9.forms.config.data.saveLocalData = true;
  }
  if(!globalDataSettingInOldData && globalDataSettingInNewData) {
    Core9.forms.config.data.saveLocalData = true;
  }
  if(globalDataSettingInOldData && globalDataSettingInNewData) {
    Core9.forms.config.data.saveLocalData = false;
  }
  if(!globalDataSettingInNewData) {
    Core9.forms.config.data.saveGlobalData = false;
  }
  if(globalDataSettingInNewData) {
    Core9.forms.config.data.saveGlobalData = true;
  }
  if(!globalDataSettingInOldData) {
    Core9.forms.config.data.saveGlobalData = false;
  }
  if(Core9.forms.config.data.newGlobalDataSetting.length > 0) {
    Core9.forms.config.data.saveGlobalData = true;
    Core9.forms.config.data.saveLocalData = true;
  }
  // case if globaldata set and we change it now local will not be saved (compare globaldata value old and new)
  var data = Core9.forms.updateUserData(script, result, oldUserData, newUserData);
  //result.data.data.userData = oldUserData;
  Core9.forms.__registry.data.block.userData = data;
  //Core9.forms.config.data.globalData = {};
  //Core9.forms.config.data.localData = {};
}
Core9.forms.saveData = function (result) {
  var data = result.data.data.userData;
  var block = Core9.forms.__registry.data.block;
  var file = block.pageDataDirectory + block.id + '.json';
  var globalDataDirectory = block.globalDataDirectory;
  var content = JSON.stringify(data);
  if(Core9.forms.config.data.saveGlobalData) {
    var globalJson = globalDataDirectory + Core9.forms.config.data.newGlobalDataSetting + '.json';
    $.getJSON(globalJson, function (data) {
        console.log("success");
        Core9.forms.ajax(content, globalJson);
      })
      .done(function () {
        console.log("second success");
      })
      .fail(function () {
        // create new global json file
        var globalJson = globalDataDirectory + Core9.forms.config.data.newGlobalDataSetting + '.json';
        Core9.forms.ajax(content, globalJson);
        console.log("error");
        var message = {
          action: "gotopages"
        }
        Core9.iframe.child.sentMessageToParent(message);
      })
      .always(function () {
        console.log("complete");
      });
  }
  if(Core9.forms.config.data.saveLocalData) {
    Core9.forms.ajax(content, file);
  }
}
Core9.forms.ajax = function (content, file) {
  var url = '/api/io/save';
  $.ajax({
    type: "POST",
    url: url,
    data: {
      content: content,
      file: file.toLowerCase(),
      account: Core9.forms.config.account
    },
    statusCode: {
      404: function () {
        alert("page not found");
      },
      200: function () {
        console.log("done 200 reset page");
        var message = {
          action: "resetPageEditor"
        }
        Core9.iframe.child.sentMessageToParent(message);
      }
    }
  });
}
Core9.forms.saveForm = function (script, schema, data, formData) {
  var path = location.origin + Core9.forms.paths.formFilter.format(Core9.forms.config.account, Core9.forms.config.type) + 'save.js';
  var plugin = new jailed.Plugin(path);
  var input = {
    script: script,
    schema: schema,
    data: data,
    formData: formData
  }
  var start = function () {
    // exported method is available at this point
    plugin.remote.save(input, reportResult);
  }
  var reportResult = function (result) {
    if(result.data.action == 'save') {
      Core9.forms.saveFormDataToUserRegistry(result);
      Core9.forms.saveData(result);
    }
  }
  plugin.whenConnected(start);
}
Core9.forms.setSelectBox = function (formData) {
  var newSelect = document.querySelector('#form-select');
  newSelect.innerHTML = "";
  var opt = document.createElement("option");
  opt.value = "";
  opt.innerHTML = "";
  newSelect.appendChild(opt);
  for(var key in formData) {
    if(formData.hasOwnProperty(key)) {
      var opt = document.createElement("option");
      opt.value = key;
      opt.innerHTML = key.replace('.json', '');
      newSelect.appendChild(opt);
    }
  }
}
Core9.forms.init = function (data) {
  jQuery('#form-holder')
    .empty();
  Core9.forms.__registry.data = data;
  Core9.forms.setSelectBox(data.block.formData);
  Core9.forms.config.account = data.block.account;
  Core9.forms.config.theme = data.block.theme;
  Core9.forms.config.type = data.block.type;
  Core9.forms.getData();
}
