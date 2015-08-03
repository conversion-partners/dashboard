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



function getSelectBoxEntries(type, page) {

  var template = $(".template-data").val();
  var language = $(".language-data").val();
  var country = $(".country-data").val();
  if (country == null) {
    country = ""
  }
  var query = {
    "language": language,
    "country": country
  }
  if(type == 'templates'){
    query.template = template;
    if (page) {
      query.page = page;
    }
  }
  if(type == 'pages'){
    query.domain  = template;
  }

  var result = Core9.data[type].findObjects(query);
  return result;
}



function initTemplateSelectBoxes(themeOrSiteCollection) {

  var templateData = {
    data: [""]
  }

  $(".template-data").on("change", function() {
    $(".language-data").select2("destroy");
    $(".language-data").html("<option><option>");
    var data = [];
    
    var query = {};
    if(TYPEOFPAGE == 'pages'){
    	query.domain = $(this).val();
    }
    if(TYPEOFPAGE == 'templates'){
    	query.template = $(this).val();
    }
    
    var entries = Core9.data[TYPEOFPAGE].find(query);
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
    
    var query = {};
    if(TYPEOFPAGE == 'pages'){
    	query.domain = $(".template-data").val();
    }
    if(TYPEOFPAGE == 'templates'){
    	query.template = $(".template-data").val();
    }
    query.language = $(this).val();
    
    var entries = Core9.data[TYPEOFPAGE].find(query);
    for (i = 0; i < entries.length; i++) {
      var country = entries[i]['country'];
      if (!arrayContains(country, data) && !isEmpty(country)) {
        data.push(country);
      }
    }
    changeSelect2Data("country-data", data);
  });

  changeSelect2Data("template-data", themeOrSiteCollection);
  changeSelect2Data("language-data", []);
  changeSelect2Data("country-data", []);

}
