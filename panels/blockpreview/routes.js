


var blockpreviewRoutes = {
  '/blockpreview$/': function(req) {
    console.log(req);
    Core9.panel.open('panel-blockpreview');
  }
}
Router.addRoutes(blockpreviewRoutes);
