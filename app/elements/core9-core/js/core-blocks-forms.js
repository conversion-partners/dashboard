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
    return path.split('.').reduce(function (prev, curr) {
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
if(typeof Core9 === 'undefined') {
  Core9 = {}
};
"use strict";
if(typeof Core9.blocks === 'undefined') {
  Core9.blocks = {}
};
Core9.blocks.forms = {}
Core9.blocks.forms = {
  config: {
    account: {},
    theme: {},
    type: {}
  },
  paths: {
    blocks: "/dashboard/data/accounts/{0}/blocks/",
    bower: "/dashboard/data/accounts/{0}/blocks/bower.json",
    template: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/tpl/hbs/templates.html",
    formSteps: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/config/steps.json",
    formFilter: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/filters/",
    formDirectory: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/",
    defaultBlockData: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/data/default.json",
    userDataById: "/dashboard/data/accounts/{0}/sites/pages/{1}/versions/{2}/data/{3}.json"
  }
}
Core9.blocks.forms.__registry = {
  blocks: {},
  data: {}
}
Core9.blocks.forms.getData = function (formData) {
  var script;
  if(typeof formData == 'undefined') {
    return;
  } else {
    script = formData.value;
  }
  var schema = Core9.blocks.forms.__registry.data.block.formData[script];
  var data = {};
  data.userData = Core9.blocks.forms.__registry.data.block.userData;
  data.defaultData = Core9.blocks.forms.__registry.data.block.defaultData;
  Core9.blocks.forms.filterForm(script, schema, data);
}
Core9.blocks.forms.getUserOrDefaultData = function (result) {
  // check user or default data
  return result.data.userData;
}
Core9.blocks.forms.filterForm = function (script, schema, data) {
  var path = location.origin + Core9.blocks.forms.paths.formFilter.format(Core9.blocks.forms.config.account, Core9.blocks.forms.config.type) + 'form-data-organizer.js';
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
    var data = Core9.blocks.forms.getUserOrDefaultData(result);
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
        if(len == 1) {
          obj = scriptData;
        } else {
          obj[item] = scriptData;
        }
      }
    }
    result.formData[script] = obj;
    Core9.blocks.forms.loadForm(script, schema, result);
  }
  plugin.whenConnected(start);
}
Core9.blocks.forms.loadForm = function (script, schema, data) {
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
    disable_collapse: false, // needs to be a user setting
    disable_properties: true,
    format: 'grid',
    theme: 'bootstrap3',
    schema: schema
  });
  // location.origin + "/dashboard/data/accounts/easydrain/blocks/bower_components/image/forms/frontend/steps/author.json"
  function onSave() {
    data.action = "save";
    Core9.blocks.forms.saveForm(script, schema, data, Core9.editor.getValue());
  }
  function onSubmit(){
    data.action = "submit";
    Core9.blocks.forms.saveForm(script, schema, data, Core9.editor.getValue());
  }
  $('label').next('select').hide();
  // Hook up the submit button to log to the console
  var saveButton = document.getElementById('save');
  var submitButton = document.getElementById('submit');
  saveButton.removeEventListener('click', onSave, false);
  saveButton.addEventListener('click', onSave, false);
  submitButton.removeEventListener('click', onSubmit, false);
  submitButton.addEventListener('click', onSubmit, false);
}
Core9.blocks.forms.saveData = function (result) {}
Core9.blocks.forms.saveFormDataToUserRegistry = function (result) {
  console.log('save to user registry');
  console.log(result);
}
Core9.blocks.forms.saveForm = function (script, schema, data, formData) {
  var path = location.origin + Core9.blocks.forms.paths.formFilter.format(Core9.blocks.forms.config.account, Core9.blocks.forms.config.type) + 'save.js';
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
    console.log("Result is: ");
    console.log(result);
    if(result.data.action == 'submit') {
      // submit to backend
      Core9.blocks.forms.saveData(result);
    } else if(result.data.action == 'save') {
      // save form to registry and processed next form
      // set to registry userdata
      Core9.blocks.forms.saveFormDataToUserRegistry(result);
    }
  }
  plugin.whenConnected(start);
}
Core9.blocks.forms.setSelectBox = function (formData) {
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
Core9.blocks.forms.init = function (data) {
  Core9.blocks.forms.__registry.data = data;
  Core9.blocks.forms.setSelectBox(data.block.formData);
  Core9.blocks.forms.config.account = data.block.account;
  Core9.blocks.forms.config.theme = data.block.theme;
  Core9.blocks.forms.config.type = data.block.type;
  Core9.blocks.forms.getData();
}
