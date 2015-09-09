var formbuilderRoutes = {
  '/formbuilder$/': function(req) {
    Core9.panel.open('panel-formbuilder');
    Core9.iframe.parent.sentMessageToIframe('console.log("hi");', Core9.panel.getIframeById('panel-formbuilder'));
  }
}
Router.addRoutes(formbuilderRoutes);
