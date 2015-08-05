Core9 = {}

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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

function arrayContains(needle, arrhaystack) {
  return (arrhaystack.indexOf(needle) > -1);
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}




Core9.workspace = {
  cleanWorkspace: function() {
    while (Core9.workspace.firstChild) {
      try {
        Core9.workspace.removeChild(Core9.workspace.firstChild);
      } catch (e) {
        // TODO: handle exception
      }

    }
  }
};

Core9.xmlToString = function(xmlData) {

  var xmlString;
  //IE
  if (window.ActiveXObject) {
    xmlString = xmlData.xml;
  }
  // code for Mozilla, Firefox, Opera, etc.
  else {
    xmlString = (new XMLSerializer()).serializeToString(xmlData);
  }
  return xmlString;
};

Core9.guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

Core9.iframeLoadedEvent = new Event('iframeLoadedEvent');
Core9.j = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest;
    xhr.addEventListener("error", reject);
    xhr.addEventListener("load", resolve);
    xhr.open("GET", url);
    xhr.send(null);
  });
}

Core9.deDupeArray = function(a) {
  var temp = {};
  for (var i = 0; i < a.length; i++)
    temp[a[i]] = true;
  var r = [];
  for (var k in temp)
    r.push(k);
  return r;
}

Core9.ajax = function(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      callback(xhr);
    }
  }
  xhr.open(method, url, true);
  xhr.send(null);
}

Core9.iframe = {
  write: function(iframe, content, grid) {
    if (grid) {
      content = content.replace('</body>', '<script id="js-boot" src="/dashboard/app/elements/core9-gridmanager/boot.min.js"></script></body>');
    }
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(content);
    iframe.contentWindow.document.close();
  },
  getContent: function(iframe) {
    var document = iframe.contentDocument;
    var serializer = new XMLSerializer();
    var content = serializer.serializeToString(document);
  }
}

Core9.system = {
  unwrapModule: function(mod) {
    for (key in mod) {
      if (mod.hasOwnProperty(key)) {
        var value = mod[key];
        return value;
      }
    }
  },
  multiImport: function(modules) {
    return Promise.all(modules.map(function(m) {

      return System.import(m)
    }))
  }
}

Core9.panel = {
  __listOfPanels: {},
  __registry: {},
  __resolve: {},
  __setRegistry: function(panel, json) {
    Core9.panel.__registry[panel] = json;
    var lastItem = Core9.panel.__listOfPanels[Core9.panel.__listOfPanels.length - 1];
    if (panel == lastItem) {
      Core9.panel.__resolve('all panels loaded');
      var defaultRoutes = {
        'default': function() {}
      }
      Router.addRoutes(defaultRoutes).listen();
    }
  },
  __setPanelJson: function(panel) {
    Core9.ajax('GET', '/dashboard/panels/' + panel + '/routes.js', null,
      function(data) {
        eval(data.responseText);
        //console.log('adding routes for ' + panel);
      });
    Core9.ajax('GET', '/dashboard/panels/' + panel + '/data.json', null,
      function(data) {
        Core9.panel.__setRegistry(panel, JSON
          .parse(data.responseText));
      });
  },
  add: function(listOfPanels, resolve) {
    if (listOfPanels.length == 0)
      return;
    Core9.panel.__resolve = resolve;
    Core9.panel.__listOfPanels = listOfPanels;
    for (var i = 0; i < listOfPanels.length; i++) {
      Core9.panel.__setPanelJson(listOfPanels[i]);
    }
  },
  get: function() {
    return Core9.panel.__registry;
  },
  __activatePanelButton: function(panel, button) {
    // now close open

    button.getElementsByClassName("open")[0].addEventListener('click',
      function() {
        panel.style.width = '100%';
        panel.childNodes[1].style.width = "100%";
      }, false);

    button.getElementsByClassName("close")[0].addEventListener('click',
      function() {
        try {
          panel.style.width = '0px'
          panel.childNodes[1].style.width = "0px";
        } catch (e) {}
      }, false);

    /*
     * button.addEventListener('click', function() { if (panel.style.width ==
     * '100%') { panel.style.width = '0px' panel.childNodes[1].style.width =
     * "0px"; } else { panel.style.width = '100%';
     * panel.childNodes[1].style.width = "100%"; } }, false);
     */
    return button;
  },
  __createPanelButton: function() {
    var panelButton = document.createElement('div');
    var openButton = document.createElement('div');
    var closeButton = document.createElement('div');

    openButton.className = "open";
    closeButton.className = "close";

    panelButton.appendChild(openButton);
    panelButton.appendChild(closeButton);

    panelButton.style.zIndex = "9";
    panelButton.className = "panelbutton";
    return panelButton;
  },
  __createPanel: function(id, zIndex, classes, content, button) {
    var panel = document.createElement('div');
    panel.setAttribute('id', id);
    panel.style.zIndex = zIndex.toString();
    panel.className = "panel " + classes;
    if (button) {
      panel.style.width = '100%';
      panel.appendChild(Core9.panel.__activatePanelButton(panel,
        Core9.panel.__createPanelButton()));
    }

    return panel;
  },

  iframe: {
    create: function(id, zIndex, classes, content, button) {
      var panel = Core9.panel.__createPanel(id, zIndex, classes, content,
        button);
      var guid = Core9.guid();
      var content;
      Core9.ajax('GET', content, null, function(data) {

        var iframe = document.createElement('iframe');
        iframe.setAttribute('id', id + '-' + guid);
        iframe.className = "iframe " + classes;
        document.body.appendChild(iframe);
        Core9.iframe.write(iframe, data.responseText);
        iframeWindow = iframe.contentWindow || iframe.contentDocument.parentWindow;
        iframeWindow.onload = function() {
          Core9.iframeLoadedEvent.detail = {
            id: guid,
            classes: classes
          };
          window.dispatchEvent(Core9.iframeLoadedEvent);
          /*
           * not working without F12 setTimeout(function() { var
           * iframe = document.getElementById(guid);
           * panel.appendChild(iframe); Core9.iframe.write(iframe,
           * data.responseText); }, 1000);
           */
        };
        content = data.responseText;
      });
      // Fixme too hacky!!
      setTimeout(function() {
        var iframe = document.getElementById(id + '-' + guid);
        panel.appendChild(iframe);
        Core9.iframe.write(iframe, content);
      }, 1000);
      return panel;
    }
  },
  div: {
    create: function(id, zIndex, classes, content, button) {
      var panel = Core9.panel.__createPanel(id, zIndex, classes, content,
        button);

      Core9.ajax('GET', content, null, function(data) {
        var guid = Core9.guid();
        var div = document.createElement('div');
        div.innerHTML = data.responseText.replace('evalscript',
          'evalscript-' + guid);
        panel.appendChild(div);
        try {
          var x = document.getElementById('evalscript-' + guid);
          if (x !== null)
            eval(x.innerHTML);
        } catch (e) {
          console.log(e);
        }

      });

      return panel;
    }
  },

  create: function(id, zIndex, classes, type, content, button) {
    return Core9.panel[type]['create']
      (id, zIndex, classes, content, button);
  },
  remove: function(id) {},
  update: function(id, classes, content) {},
  get: function(id) {},
  close: function() {
    for (var i = 0; i < Core9.panellist.length; i++) {
      var panel = Core9.panel.__registry[Core9.panellist[i]];
      if (panel.id) {
        document.querySelector('#' + panel.id).classList.remove("core9-selected");
        document.querySelector('#' + panel.id + ' > div.panelbutton > div.close').click();
      }
    }
  },
  setPanelWidth: function() {
    var menuWidth = document.querySelector('#panel-iframe-menu').offsetWidth;
    var w = window.innerWidth;
    var panel = document.querySelector('.core9-selected > iframe');
    if (panel) {
      var margL = panel.style.marginLeft;
      panel.style.width = (w - menuWidth) + "px";
      panel.style.marginLeft = menuWidth + "px";
    }
  },
  open: function(openPanel) {
    this.close();
    var panel = document.querySelector('#' + openPanel + ' > div.panelbutton > div.open');
    if (panel) {
      document.querySelector('#' + openPanel).className = document.querySelector('#' + openPanel).className + " core9-selected";
      panel.click();
      this.setPanelWidth();
    }

  },
  getIframeById: function(id) {
    return document.getElementById(id).childNodes[1];
  }

}
