function fromEmptyToNull(val) {
  if (isEmpty(val)) {
    return "null";
  }
  return val;
}


function changeSelect2Data(className, dataCategory) {
  $("." + className).select2({
    data: dataCategory
  });
}

function getIdFromItem(element) {
  while(element.parentNode) {
    element = element.parentNode;
    if(element.tagName == 'LI') {
      return element.dataset.id;
    }
  }
}

function updateOutput() {
  var content = $('#nestable').nestable('serialize');
}

function getSelectBoxValues() {
  var data = {};
  data.theme = $(".template-data").val();
  data.language = $(".language-data").val();
  data.country = $(".country-data").val();
  if(data.country == null) {
    data.country = ""
  }
  return data;
}

function getSelectedPageId() {
  if(TYPEOFPAGE == 'themes') {
      return $('li[data-id="' + Core9.data.currentid + '"]').data('template');
  }
  if(TYPEOFPAGE == 'pages') {
    return $('li[data-id="' + Core9.data.currentid + '"]').data('page');
  }
}

function getCurrentPage() {
  var id = getCurrentPageId();
  if(typeof id == 'undefined') {
    var res = Core9.data[TYPEOFPAGE].data;
    if(res.length == 1) {
      return res[0];
    } else {
      alert('oeps please reload the page.');
    }
  } else {
    return Core9.data[TYPEOFPAGE].get(id);
  }
}

function getCurrentPageId() {
  var delButton = $('#delpage');
  var page = $('li[data-id="' + Core9.data.currentid + '"]');
  var lokiId = $(page).data('$loki');
  var pageName = $(page).data('page');
  if(typeof pageName == 'undefined') {
    pageName = $('#editor_holder2 > div > h3 > span').text();
  }
  var data = getSelectBoxValues();
  if(TYPEOFPAGE == 'themes') {
    var templateData = {
      "theme": data.theme,
      "language": data.language,
      "country": data.country,
      "template": pageName
    }
    if(typeof lokiId == 'undefined') {
      var res = Core9.data[TYPEOFPAGE].findObjects(templateData);
      if(res.length > 0) {
        for(var i = 0; i < res.length; i++) {
          return res[i].$loki; // sorry just one at a time
        }
      }
    } else {
      return lokiId;
    }
  }
  if(TYPEOFPAGE == 'pages') {
    var pageData = {
      "domain": data.theme,
      "language": data.language,
      "country": data.country,
      "page": pageName
    }
    if(typeof lokiId == 'undefined') {
      var res = Core9.data[TYPEOFPAGE].findObjects(pageData);
      if(res.length > 0) {
        for(var i = 0; i < res.length; i++) {
          return res[i].$loki; // sorry just one at a time
        }
      }
    } else {
      return lokiId;
    }
  }
}

function getActiveTab() {
  var tabs = $('#editor_holder2 > div > div.rows > div.tabs.list-group.col-md-2 > a.list-group-item');
  for(var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    if($(tab).hasClass("active")) {
      return i;
    }
  }
  return 0;
}

function setActiveTab(tab) {
  $('#editor_holder2 > div > div.rows > div.tabs.list-group.col-md-2 > a.list-group-item').eq(tab)[0].click();
}

function getSelectBoxEntries() {
  var page = getSelectedPageId();
  var template = $(".template-data").val();
  var language = $(".language-data").val();
  var country = $(".country-data").val();
  if(language == null) {
    language = ""
  }
  if(country == null) {
    country = ""
  }
  var query = {
    "language": language,
    "country": country
  }

  if(TYPEOFPAGE == 'themes') {
    query.theme = template;
    if(page) {
      query.template = page;
    }
    if(isEmpty(query.theme)) {
      try {
        Core9.template.save();
      } catch(e) {}
      alert("please reload page");
      return;
    }
  }
  if(TYPEOFPAGE == 'pages') {
    if(page) {
      query.page = page;
    }
    query.domain = template;
  }
  var result = Core9.data[TYPEOFPAGE].findObjects(query);
  return result;
}

function initNestable(jsonStr) {
  console.log('init nestable..');
  initTemplateSelectBoxes();
  var container = document.getElementById('nestablecontainer');
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }
  var div = document.createElement('div');
  div.id = 'nestable';
  div.className = 'dd';
  container.appendChild(div);
  $('#nestable').nestable({
    group: 1,
    maxDepth: 20,
    json: jsonStr,
    contentCallback: function (item) {
      var title = "";
      if(TYPEOFPAGE == 'themes') {
        title = item.template;
      }
      if(TYPEOFPAGE == 'pages') {
        title = item.page;
      }
      var content = title || '' ? title : item.id;
      content += '<div class="dd-handle dd3-handle">Drag</div><div class="loki-id">' + item.$loki + '</div>';
      return content;
    },
    callback: function (l, e) {
      var element = $(e[0]).find('.dd-content')[0].childNodes[0];
      //var page = element.textContent;
      var id = getIdFromItem(element);
      Core9.data.currentid = id;
      document.getElementById('delpage').dataset.currentid = id;
      activateEditor();
    }
  }).on('change', updateOutput);
}

function initTemplateSelectBoxes() {
  var templateData = {
    data: [""]
  }
  $(".template-data").on("change", function () {
    $(".language-data").select2("destroy");
    $(".language-data").html("<option><option>");
    var data = [];
    var query = {};
    if(TYPEOFPAGE == 'pages') {
      query.domain = $(this).val();
    }
    if(TYPEOFPAGE == 'themes') {
      query.theme = $(this).val();
    }
    var entries = Core9.data[TYPEOFPAGE].find(query);
    for(i = 0; i < entries.length; i++) {
      var lang = entries[i]['language'];
      if(!arrayContains(lang, data) && !isEmpty(lang)) {
        data.push(lang);
      }
    }
    changeSelect2Data("language-data", data);
  });
  $(".language-data").on("change", function () {
    $(".country-data").select2("destroy");
    $(".country-data").html("<option><option>");
    var data = [];
    var query = {};
    if(TYPEOFPAGE == 'pages') {
      query.domain = $(".template-data").val();
    }
    if(TYPEOFPAGE == 'themes') {
      query.theme = $(".template-data").val();
    }
    query.language = $(this).val();
    var entries = Core9.data[TYPEOFPAGE].find(query);
    for(i = 0; i < entries.length; i++) {
      var country = entries[i]['country'];
      if(!arrayContains(country, data) && !isEmpty(country)) {
        data.push(country);
      }
    }
    changeSelect2Data("country-data", data);
  });
  changeSelect2Data("template-data", Core9.template[TYPEOFPAGE]);
  changeSelect2Data("language-data", []);
  changeSelect2Data("country-data", []);
}
