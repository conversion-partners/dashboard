jQuery(document).ready(function() {

  var imageList = $('.item > img');

  jQuery.fn.center = function() {
    return this.css({
      'left': ($(window).width() / 2) - $(this).width() / 2,
      'top': ($(window).height() / 2) - $(this).height() / 2,
      'position': 'fixed'
    });
  };




  function getNextAndPrev(img) {
    var res = [];
    var item = $(img).parent();
    var next = item.next().find('img');
    var prev = item.prev().find('img');
    res['next'] = next;
    res['current'] = item;
    res['prev'] = prev;
    return res;
  }

  function getIndex(img) {
    for (var i = 1; i < imageList.length; i++) {
      if (img.src == imageList[i].src) {
        return i;
      }
    }
    return 1;
  }


  function activatePrevNext(img, imageList) {


    function next() {
      var img = $('#biggalleryviewerimg > img')[0];
      var index = getIndex(img);
      console.log("Index: " + index);
      var image = $(imageList[index + 1]).clone();
      $('#biggalleryviewerimg').html(image);
      $(image).css('width', '100%');
    }

    function prev() {
      var img = $('#biggalleryviewerimg > img')[0];
      var index = getIndex(img);
      console.log("Index: " + index);
      var image = $(imageList[index - 1]).clone();
      $('#biggalleryviewerimg').html(image);
      $(image).css('width', '100%');
    }

    $('#biggalleryviewerdesc > span.next').off();
    $('#biggalleryviewerdesc > span.prev').off();
    $('#biggalleryviewerdesc > span.next').on('click', next);
    $('#biggalleryviewerdesc > span.prev').on('click', prev);
  }

  $('#biggalleryviewerdesc > span.delete').on('click', function() {
    $('#biggalleryviewer').toggle();
    var op = $('.masonry').css('opacity');
    if (op == '0.5') {
      $('.masonry').css('opacity', '1');
    }
  });



  $('.masonry').on('click', function(e) {
    if (event.target.nodeName == "IMG") {
      $('#biggalleryviewer').show();
      var image = $(e.target).clone();
      $('#biggalleryviewerimg').html(image);
      $(image).css('width', '100%');
      $('#biggalleryviewer').center();
      $('.masonry').css('opacity', '0.5');
      activatePrevNext(e.target, imageList);

    }
  });

  function showHidden() {
    var hiddenElements = $("body").find("div.item:hidden")
    for (var i = 0; i < 5; i++) {
      $(hiddenElements[i]).show();
    }
  }

  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
      showHidden();
    }
  });


});
