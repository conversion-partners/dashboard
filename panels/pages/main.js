if (typeof Core9 === 'undefined') {
  Core9 = {}
};
Core9.editor = {};

var starting_value = [{
  title: "new title",
  percentage: 100,
  status: "active"
}];

var getArray = function(nr) {
  return Array.apply(null, {
    length: nr
  }).map(Number.call, Number)
}

var activateEditor = function(page, id, pageData) {
  document.getElementById('delpage').dataset.currentid = id;
  try {
    Core9.editor.destroy();
    Core9.editor2.destroy();
  } catch (e) {
    // TODO: handle exception
  }
  var starting_value = pageData.versions;
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
          default : pageData.url
        }
      }
    }
  });

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


var getSelectBoxEntries = function(page) {
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
  return dbEntries.findObjects(query);
}


$(document)
  .ready(
    function() {


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



      $('#newpage').on('click', function() {
        var content = $('#nestable').nestable('serialize');
        var json = content;
        json.unshift({
          "id": guid(),
          "page": "New Page"
        });
        initNestable(JSON.stringify(json));
      });

      $('#delpage').on('click', function() {
        $('li[data-id="' + this.dataset.currentid + '"]').remove();
      });


    });

var updateOutput = function() {
  var content = $('#nestable').nestable(
    'serialize');
  //console.log(content);
  //console.log(JSON.stringify(content));
}

var getIdFromItem = function(element) {
  while (element.parentNode) {
    element = element.parentNode;
    if (element.tagName == 'LI') {
      return element.dataset.id;
    }
  }
}

function changeSelect2Data(className, dataCategory) {
  $("." + className).select2({
    data: dataCategory
  });
}

function arrayContains(needle, arrhaystack) {
  return (arrhaystack.indexOf(needle) > -1);
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

var initTemplateSelectBoxes = function(themeData) {

  var templateData = {
    data: [""]
  }

  for (var key in themeData) {
    if (themeData.hasOwnProperty(key)) {
      templateData.data.push(key);
      try {
        var entries = themeData[key].data.pages[key].entries;
        for (i = 0; i < entries.length; i++) {
          entries[i]["template"] = key;
          dbEntries.insert(entries[i]);
        }
      } catch (e) {
        //console.log(e);
      }

    }
  }



  $(".template-data").on("change", function() {
    $(".language-data").select2("destroy");
    $(".language-data").html("<option><option>");
    var data = [];
    var entries = dbEntries.find({
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
    var entries = dbEntries.find({
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

  changeSelect2Data("template-data", templateData["data"]);
  changeSelect2Data("language-data", []);
  changeSelect2Data("country-data", []);

}


var initNestable = function(jsonStr, themeData) {
  if (themeData != null && pageInit) {
    THEMEDATA = themeData;
    initTemplateSelectBoxes(themeData);
    pageInit = false;
  }
  var container = document.getElementById('nestablecontainer');
  while (container.firstChild) container.removeChild(container.firstChild);
  var div = document.createElement('div');
  div.id = 'nestable';
  div.className = 'dd';
  container.appendChild(div);
  $('#nestable')
    .nestable({
      group: 1,
      maxDepth: 20,
      json: jsonStr,
      contentCallback: function(item) {
        var content = item.page || '' ? item.page : item.id;
        content += '<div class="dd-handle dd3-handle">Drag</div>';
        return content;
      },
      callback: function(l, e) {
        var element = $(e[0]).find('.dd-content')[0].childNodes[0];
        var page = element.textContent;
        activateEditor(page, getIdFromItem(element), getSelectBoxEntries(page)[0]);
      }
    }).on('change', updateOutput);
}
