var gridRoutes = {
  '/editor$/': function () {
    Core9.panel.open('panel-iframe-site');
    if(initPanelIframeSite) {
      var iframe = Core9.panel.getIframeById('panel-iframe-site');
      var cmd = 'window.gm = jQuery("#mycanvas").gridmanager().data("gridmanager");';
      Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
      initPanelIframeSite = false;
    }
  },
  '/auth/logout': function () {
    window.location.replace("/auth/logout");
  }
}
Router.addRoutes(gridRoutes);
