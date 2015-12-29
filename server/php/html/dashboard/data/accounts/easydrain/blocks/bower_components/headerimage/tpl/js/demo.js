// demo slider
$(function() {
  $("#resizable").resizable({
    minWidth: 150,
    maxWidth: 840,
    grid: [10, 0],
    start: function() {
      $('.hint').fadeOut();
    },
    resize: function() {
      $('.live-classes').text(
        $('[data-type="headerimage"]').attr('class').replace('core9-block', '')
      );
    }
  });
});
