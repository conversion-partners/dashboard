var blockpreviewRoutes = {
  '/blockpreview/*': function (req) {
    Core9.panel.open('panel-blockpreview');
    console.log(req);

    var iframe = Core9.panel.getIframeById('panel-blockpreview');
    var cmd = 'initIframe('+JSON.stringify(location)+');';
    Core9.iframe.parent.sentMessageToIframe(cmd, iframe);

  }
}
Router.addRoutes(blockpreviewRoutes);
