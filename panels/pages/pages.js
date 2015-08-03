initStarted = false;
TYPEOFPAGE = 'pages';

function init() {
  if (!initStarted) {
    initNestable([]);
    initStarted = true;
  }
}



function initNestable(jsonStr) {
  console.log('init nestable..');

  initTemplateSelectBoxes(Core9.template.pages);

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
          getSelectBoxEntries('pages', page)[0] // get only one sorry
        );
      }
    }).on('change', updateOutput);
}
var activateEditor = function(page, id, pageData) {
  document.getElementById('delpage').dataset.currentid = id;
  try {
    Core9.editor.destroy();
    Core9.editor2.destroy();
  } catch (e) {}

  Core9.editor2 = new JSONEditor(document.getElementById('editor_holder'), {
    disable_edit_json: true,
    disable_collapse: true,
    disable_properties: true,
    format: 'grid',
    theme: 'bootstrap3',
    schema: {
      type: "object",
      title: page,
      properties: {
        url: {
          type: "string",
          default: pageData.url
        }
      }
    }
  });

var starting_value = pageData.versions;

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
          id: "person",
          properties: {
            "title": {
              "type": "string",
              "description": "Page title",
              "minLength": 4
            },
            "theme": {
              type: "string",
              enum: ["shunsine", "clean", "fluid"]
            },
            "language": {
              type: "string",
              enum: []
            },
            "country": {
              type: "string",
              enum: []
            },
            "percentage": {
              type: "integer",
              enum: getArray(101)
            },
            "startdate": {
              "type": "string",
              "format": "date"
            },
            "enddate": {
              "type": "string",
              "format": "date"
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
    });

  document.getElementById('restore').addEventListener('click',
    function() {
      Core9.editor.setValue(starting_value);
    });

}
