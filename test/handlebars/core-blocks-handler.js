if(typeof Core9 === 'undefined') {
  Core9 = {}
};
if(typeof Core9.blocks === 'undefined') {
  Core9.blocks = {}
};
Core9.blocks.handler = function () {}
Core9.blocks.handler.Handlebars = function () {
  if(typeof Handlebars == 'undefined') {
    alert('no handlebars found');
  }
  return Handlebars;
}
Core9.blocks.handler.triggerBlockDataReady = function () {
  var event = new Event('blockdataready');
  document.body.dispatchEvent(event);
}
Core9.blocks.handler.getBlocks = function () {
  return document.querySelectorAll(".core9-block");
}
Core9.blocks.handler.getFormSteps = function () {}
Core9.blocks.handler.getJsonData = function () {}
Core9.blocks.handler.getTemplateHtml = function () {}
Core9.blocks.handler.getData = function () {
  Core9.blocks.handler.triggerBlockDataReady();
}
Core9.blocks.handler.init = function () {
  Core9.blocks.handler.getData();
}
Core9.blocks.handler.init();
