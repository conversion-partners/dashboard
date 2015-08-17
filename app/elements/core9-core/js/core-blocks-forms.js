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
Core9.blocks.forms = {}
Core9.blocks.forms = {
  config: {
    account: {},
    theme: {}
  },
  paths: {
    blocks: "/dashboard/data/accounts/{0}/blocks/",
    bower: "/dashboard/data/accounts/{0}/blocks/bower.json",
    template: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/tpl/hbs/templates.html",
    formSteps: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/steps.json",
    formDirectory: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/steps/",
    defaultBlockData: "/dashboard/data/accounts/{0}/blocks/bower_components/{1}/forms/frontend/data/default.json",
    userDataById: "/dashboard/data/accounts/{0}/sites/pages/{1}/versions/{2}/data/{3}.json"
  }
}
Core9.blocks.forms.__registry = {
  blocks: {},
  data: {}
}
Core9.blocks.forms.getDataAndSchema = function (formFile) {}
Core9.blocks.forms.getData = function (formData) {
  console.log('formdata : ');
  if(typeof formData != 'undefined') {
    console.log(formData.value);
    var dataAndSchema = Core9.blocks.forms.getDataAndSchema(formData.value);
  }
  var schema = {
    type: "object",
    title: " ",
    properties: {
      title: {
        type: "string"
      },
      body: {
        type: "string",
        format: "html",
        options: {
          wysiwyg: true
        }
      }
    }
  }
  var data = {
    "title": "test",
    "body": "hi"
  };
  Core9.blocks.forms.loadForm(schema, data);
}
Core9.blocks.forms.filterForm = function (schema, data) {
  var plugin;
  var setImage = function (src) {
    console.log(src);
  }
  var setLink = function (src) {
    console.log(src);
  }
  console.log('update 1');
  var api = {
    setImage: setImage,
    setLink: setLink
  }
  var path = location.origin + "/dashboard/data/accounts/easydrain/blocks/bower_components/image/forms/frontend/steps/result/result.js";
  plugin = plugin || new jailed.Plugin(path, api);
  console.log('update 2');
  console.log(plugin);
}
Core9.blocks.forms.loadForm = function (schema, data) {
  Core9.blocks.forms.filterForm(schema, data);
  try {
    Core9.editor.destroy();
  } catch(e) {}
  Core9.editor = new JSONEditor(document.querySelector('#form-holder'), {
    ajax: true,
    disable_edit_json: true,
    disable_collapse: true,
    disable_properties: true,
    format: 'grid',
    theme: 'bootstrap3',
    no_additional_properties: false,
    required_by_default: false,
    startval: data,
    schema: schema
  });

  function onSave() {
    Core9.blocks.forms.saveForm(Core9.editor.getValue());
  }
  // Hook up the submit button to log to the console
  var saveButton = document.getElementById('submit');
  saveButton.removeEventListener('click', onSave, false);
  saveButton.addEventListener('click', onSave, false);
}
Core9.blocks.forms.saveForm = function (data) {
  console.log(data);
}
Core9.blocks.forms.setSelectBox = function (formData) {
  var newSelect = document.querySelector('#form-select');
  newSelect.innerHTML = "";
  var opt = document.createElement("option");
  opt.value = "";
  opt.innerHTML = "";
  newSelect.appendChild(opt);
  for(var i = 0; i < formData.length; i++) {
    var elem = formData[i];
    var opt = document.createElement("option");
    opt.value = elem.file;
    opt.innerHTML = elem.label;
    newSelect.appendChild(opt);
  }
}
Core9.blocks.forms.init = function (data) {
  Core9.blocks.forms.__registry.data = data;
  Core9.blocks.forms.setSelectBox(data.block.formData);
  Core9.blocks.forms.config.account = data.account;
  Core9.blocks.forms.config.theme = data.theme;
  Core9.blocks.forms.getData();
}
