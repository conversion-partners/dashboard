if (typeof Core9 === 'undefined') {
  Core9 = {}
};
if (typeof Core9.blocks === 'undefined') {
  Core9.blocks = {}
};
Core9.blocks.handler = function() {}
Core9.blocks.handler.getBlocks = function (){
      return document.querySelectorAll(".core9-block");
}
Core9.blocks.handler.getData = function(){

}
Core9.blocks.handler.init = function(){
    Core9.blocks.handler.getData();
}


Core9.blocks.handler.init();
