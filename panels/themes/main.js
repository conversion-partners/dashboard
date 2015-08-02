if (typeof Core9 === 'undefined') {
  Core9 = {}
};

Core9.editor = {};

initStarted = false;

function init() {
  if (!initStarted) {
    initNestable([]);
    initStarted = true;
  }
}

function getArray(nr) {
  return Array.apply(null, {
    length: nr
  }).map(Number.call, Number)
}

function postClick(url) {
  Core9.iframe.child.sentMessageToParent({
    action: "menuClick",
    href: url,
    data: ""
  });
}

function changeSelect2Data(className, dataCategory) {
  $("." + className).select2({
    data: dataCategory
  });
}

function getIdFromItem(element) {
  while (element.parentNode) {
    element = element.parentNode;
    if (element.tagName == 'LI') {
      return element.dataset.id;
    }
  }
}

function updateOutput() {
  var content = $('#nestable').nestable(
    'serialize');
}

function arrayContains(needle, arrhaystack) {
  return (arrhaystack.indexOf(needle) > -1);
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function getSelectBoxEntries(page) {
  var template = $(".template-data").val();
  var language = $(".language-data").val();
  var country = $(".country-data").val();
  if (country == null) {
    country = ""
  }
  var query = {
    "template": template,
    "language": language,
    "country": country
  }
  if (page) {
    query.page = page;
  }
  var result = Core9.data.templates.findObjects(query);
  return result;
}

function activateEditor(page, id, pageData) {
  document.getElementById('delpage').dataset.currentid = id;
  try {
    Core9.editor.destroy();
  } catch (e) {}
  var starting_value = pageData.versions;
  $('#choose-theme-template-page').html(page);
  Core9.editor = new JSONEditor(document
    .getElementById('editor_holder2'), {
      ajax: true,
      disable_edit_json: true,
      disable_collapse: true,
      disable_properties: true,
      format: 'grid',
      theme: 'bootstrap3',
      startval: starting_value,
      no_additional_properties: true,
      required_by_default: true,
      schema: {
        type: "array",
        title: page,
        format: "tabs",
        items: {
          title: "Version",
          headerTemplate: "{{i}} - {{self.title}}",
          type: "object",
          id: "templateid",
          properties: {
            "title": {
              "type": "string",
              "minLength": 4
            },
            "status": {
              "type": "string",
              "enum": ["active", "pauzed"]
            }
          }
        }
      }
    });
  Core9.editor.on('change', function() {
    var errors = Core9.editor.validate();
    var indicator = document.getElementById('valid_indicator');
    if (errors.length) {
      indicator.style.color = 'red';
      indicator.textContent = "not valid";
    } else {
      indicator.style.color = 'green';
      indicator.textContent = "valid";
    }
  });

  document.getElementById('submit').addEventListener('click',
    function() {
      console.log(Core9.editor.getValue());

      Core9.template.save();
    });

  document.getElementById('restore').addEventListener('click',
    function() {
      Core9.editor.setValue(starting_value);
    });

}

function initTemplateSelectBoxes() {

  var templateData = {
    data: [""]
  }

  $(".template-data").on("change", function() {
    $(".language-data").select2("destroy");
    $(".language-data").html("<option><option>");
    var data = [];
    var entries = Core9.data.templates.find({
      "template": $(this).val()
    });
    for (i = 0; i < entries.length; i++) {
      var lang = entries[i]['language'];
      if (!arrayContains(lang, data) && !isEmpty(lang)) {
        data.push(lang);
      }
    }
    changeSelect2Data("language-data", data);
  });

  $(".language-data").on("change", function() {
    $(".country-data").select2("destroy");
    $(".country-data").html("<option><option>");
    var data = [];
    var entries = Core9.data.templates.find({
      "template": $(".template-data").val(),
      "language": $(this).val()
    });
    for (i = 0; i < entries.length; i++) {
      var country = entries[i]['country'];
      if (!arrayContains(country, data) && !isEmpty(country)) {
        data.push(country);
      }
    }
    changeSelect2Data("country-data", data);
  });

  changeSelect2Data("template-data", Core9.template.themes);
  changeSelect2Data("language-data", []);
  changeSelect2Data("country-data", []);

}


function initNestable(jsonStr) {
  console.log('init nestable..');

  initTemplateSelectBoxes();

  var container = document
    .getElementById('nestablecontainer');
  while (container.firstChild)
    container.removeChild(container.firstChild);
  var div = document.createElement('div');
  div.id = 'nestable';
  div.className = 'dd';
  container.appendChild(div);

  $('#nestable')
    .nestable({
      group: 1,
      maxDepth: 20,
      json: jsonStr,
      contentCallback: function(
        item) {
        var content = item.page || '' ? item.page : item.id;
        content += '<div class="dd-handle dd3-handle">Drag</div>';
        return content;
      },
      callback: function(l, e) {
        var element = $(e[0])
          .find(
            '.dd-content')[0].childNodes[0];
        var page = element.textContent;
        activateEditor(
          page,
          getIdFromItem(element),
          getSelectBoxEntries(page)[0] // get only one sorry
        );
      }
    }).on('change', updateOutput);
}








$(document)
  .ready(
    function() {


      $('#edit-selected-theme').on('click', function() {
        var dropdown = $('.choose-theme-select').val();
        var account = store.get('account');
        var page = $('#choose-theme-template-page').html();
        var theme = $(".template-data").val();
        var template = '/dashboard/data/accounts/' + account + '/themes/bower_components/' + theme + '/templates/pages/' + page + '/versions/' + dropdown + '/index.html'
        template = template.toLowerCase();
        store.set('template', template);
        store.set('theme', theme);
        history.pushState(null, null, "/dashboard/theme/edit");
        postClick("/dashboard/theme/edit");
      });

      $('#exit-modal').on('click', function() {
        $('#choose-theme').toggle();
      });

      $('#editpage').on('click', function() {
        $('#choose-theme').toggle();
        var versions = Core9.editor.getValue();
        var activeVersions = [];
        for (var i = 0; i < versions.length; i++) {
          var status = versions[i].status;
          if (status == 'active') {
            activeVersions.push(versions[i].title);
          }
        }
        changeSelect2Data("choose-theme-select", activeVersions);
      });

      $('#refresh-templates').on('click', function() {
        var entries = getSelectBoxEntries();
        var data = [];
        for (i = 0; i < entries.length; i++) {
          var item = {
            "id": guid(),
            "page": entries[i].page
          }
          data.push(item);
        }
        initNestable(JSON.stringify(data));
      });

      $('#newpage').on(
        'click',
        function() {
          var content = $('#nestable').nestable(
            'serialize');
          var json = content; //JSON.parse(jsonStr);
          json.unshift({
            "id": guid(),
            "page": "New Page"
          });
          initNestable(JSON.stringify(json));
          var theme = $(".template-data").val();
          var language = $(".language-data").val();
          var country = $(".country-data").val();
          if (country == null) {
            country = ""
          }
          var templateData = {
            "template": theme,
            "language": language,
            "country": country,
            "page": "New Page",
            "versions": [{
              "status": "active",
              "title": "New Page"
            }]
          }
          Core9.data.templates.insert(templateData);
        });

      $('#delpage')
        .on(
          'click',
          function() {
            $(
                'li[data-id="' + this.dataset.currentid + '"]')
              .remove();
          });
    });
