var blockpreviewRoutes = {
  '/blockpreview/*': function (req) {
    Core9.panel.open('panel-blockpreview');
    console.log(req);
  }
}
Router.addRoutes(blockpreviewRoutes);
