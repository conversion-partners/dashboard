(function ($) {
  'use strict';
  $('.return-to-top').click(function () {
    var body = $('html, body');
    body.animate({
      scrollTop: 0
    }, '500', 'swing', function () {
      console.log('Scrolled');
    });
  });

  /*
  $(document).on('click', '.yamm .dropdown-menu', function (e) {
    e.stopPropagation()
  });


  $(document).on('click', 'li.dropdown > .dropdown-toggle', function (e) {
    console.log('menu clicked');
    var menuLen = $('ul.nav > li.open').size();
    if(menuLen == 0) {
      $('.nav-bg').hide();
      $('body').removeClass('noscroll');
    } else {
      $('html, body').animate({ scrollTop: 0 }, 0);
      $('.nav-bg').show();
      $('body').addClass('noscroll');
    }
    e.stopPropagation()
  });
*/

})(jQuery);
