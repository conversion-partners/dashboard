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
    console.log("Result is: ");
    console.log(result);
    var schema = result.schema;
    var data = Core9.blocks.forms.getUserOrDefaultData(result);
    result.formData = {};
    // then get data accociated with script
    var items = result.stepData[script];
    var obj = {};
    for(var i = 0; i < items.length; i++) {
      var item = items[i];
      var scriptData = Object.byString(data, item);
      var type = typeof scriptData;
      if(type != "string") {
        for(var key in scriptData) {
          if(scriptData.hasOwnProperty(key)) {
            obj[key] = scriptData[key];
          }
        }
      } else {
        obj[item] = scriptData;
      }
    }
    result.formData[script] = obj;
    Core9.blocks.forms.loadForm(script, schema, result);
  }
  plugin.whenConnected(start);
}
Core9.blocks.forms.loadForm = function (script, schema, data) {
  console.log('setting form data with : ');
  console.log(data.formData[script]);
  var starting_value = data.formData[script];
  console.log(JSON.stringify(starting_value))
  if(script == "comments.json") {
    console.log(starting_value);
    starting_value = {
      body: "<p>sdaasdfasdf</p>",
      firstname: "asdfasd",
      lastname: "asdf"
    }
    console.log(starting_value);
  }
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
    Core9.blocks.forms.saveForm(script, schema, Core9.editor.getValue());
  }
  //                   $('label').next('select').hide();
  // Hook up the submit button to log to the console
  var saveButton = document.getElementById('submit');
  saveButton.removeEventListener('click', onSave, false);
  saveButton.addEventListener('click', onSave, false);
}
Core9.blocks.forms.saveForm = function (script, schema, data) {
  var path = location.origin + Core9.blocks.forms.paths.formFilter.format(Core9.blocks.forms.config.account, Core9.blocks.forms.config.type) + 'save.js';
  var plugin = new jailed.Plugin(path);
  // called after the plugin is loaded
  var input = {
    schema: schema,
    data: data
  }
  var start = function () {
    // exported method is available at this point
    plugin.remote.save(input, reportResult);
  }
  var reportResult = function (result) {
      console.log("Result is: ");
      console.log(result);
      var schema = result.schema;
      var data = result.data;
      if(result.action == 'submit') {
        Core9.blocks.forms.saveData(schema, data);
      } else {
        // add to registry and processed next form
      }
    }
    // execute start() upon the plugin is loaded
  plugin.whenConnected(start);
  console.log('saving data');
  console.log(data);
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
