var loadCss = function (id, href) {
  if(!document.getElementById(id)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    link.media = 'all';
    head.insertBefore(link, head.firstChild);
  }
}

function loadjscssfile(id, filename, filetype) {
  if(!document.getElementById(id)) {
    if(filetype == "js") { //if filename is a external JavaScript file
      var fileref = document.createElement('script');
      fileref.setAttribute("id", id);
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", filename);
    } else if(filetype == "css") { //if filename is an external CSS file
      var fileref = document.createElement("link");
      fileref.setAttribute("id", id);
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    }
    if(typeof fileref != "undefined") {
      var head = document.getElementsByTagName('head')[0];
      head.insertBefore(fileref, head.firstChild);
    }
  }
}
var initPage = function () {
  loadCss("css-bootstrap", "/dashboard/app/elements/core9-gridmanager/demo/css/bootstrap.css");
  loadCss("css-gridmanager", "/dashboard/app/elements/core9-gridmanager/dist/css/jquery.gridmanager.css");
  loadCss("css-demo", "/dashboard/app/elements/core9-gridmanager/demo/css/demo.css");
}
loadjscssfile("js-store", "/dashboard/bower_components/store-js/store.min.js", "js");
loadjscssfile("js-lokijs", "/dashboard/bower_components/lokijs/build/lokijs.min.js", "js");
loadjscssfile("js-jquery", "/dashboard/app/elements/core9-gridmanager/demo/js/jquery.js", "js");
loadjscssfile("js-jquery-ui", "/dashboard/app/elements/core9-gridmanager/demo/js/jquery-ui.js", "js");
loadjscssfile("js-bootstrap", "/dashboard/app/elements/core9-gridmanager/demo/js/bootstrap.js", "js");
loadjscssfile("js-tinymce", "/dashboard/bower_components/tinymce/tinymce.min.js", "js");
loadjscssfile("js-jquery-tinymce", "/dashboard/bower_components/tinymce/jquery.tinymce.min.js", "js");
loadjscssfile("js-handlebars", "/dashboard/bower_components/handlebars/handlebars.min.js", "js");
loadjscssfile("js-child", "/dashboard/app/elements/core9-core/js/iframe/child.js", "js");
loadjscssfile("js-blocks", "/dashboard/app/elements/core9-core/js/core-blocks.js", "js");
loadjscssfile("js-blocks-handler", "/dashboard/app/elements/core9-core/js/core-blocks-handler.js", "js");
loadjscssfile("js-gridmanager", "/dashboard/app/elements/core9-gridmanager/dist/js/jquery.gridmanager.js", "js");
initPage();
