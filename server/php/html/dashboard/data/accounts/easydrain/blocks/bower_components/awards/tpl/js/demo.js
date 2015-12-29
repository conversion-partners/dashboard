// demo slider
$(function() {
  $("#resizable").resizable({
    minWidth: 1550,
    maxWidth: 1640,
    grid: [17, 0],
    start: function() {
      $('.hint').fadeOut();
    },
    resize: function() {
      $('.live-classes').text(
        $('[data-type="awards"]').attr('class').replace('core9-block', '')
      );
    }
  });
});
