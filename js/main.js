

(function($) {

  // var $window = $(window);

  function checkWidth() {
    var windowSize = $(window).width();
    if ($(window).width() > 769) {
      $('.scotch-panel-canvas').removeAttr('style');
    }
    // if ($(window).width() <= 769) {
    //   $('.scotch-panel-canvas').attr('style');
    // }
    else {
      return;
    }
  }

  function windowResize() {
    if ($(window).resize) {
      checkWidth();
    }
  }
  
  // else {
  //   $('scotch-panel-canvas').attr('style');
  // }
  
  // header scroller
  $(window).scroll(function () {
    var scroll = $(window).scrollTop()
    if (scroll > 10) {
      $(".header").addClass("small")
    } else {
      $(".header").removeClass("small")
    }
  });

  // transition for the nav-icon to open and close
  $('#nav-icon').on('click', function(){
    $(this).toggleClass('open');
  });

  var panelExample = $('#panel').scotchPanel({
    containerSelector: 'body', // Make this appear on the entire screen
    direction: 'right', // Make it toggle in from the left
    duration: 300, // Speed in ms how fast you want it to be
    transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
    clickSelector: '#nav-icon', // Enables toggling when clicking elements of this class
    distanceX: '30%', // Size fo the toggle
    enableEscapeKey: true // Clicking Esc will close the panel
  });

  // off canvas panel
  // $(window).resize(function() {
  //   if ($(window).width() <= 769) {  
  //     panelExample.close();
  //   }
  //   if ($(window).width() > 769) {
  //     // $('body').removeClass('scotchified');
  //     $('.scotch-panel-canvas').removeAttr('style');
  //   }
  // });
  // $(window).resize(function() {
  //   if ($(window).width() >= 769 && $('.scotch-panel-canvas').hasClass('scotch-is-showing')) {
  //     scotchPanel.close();
  //   }
  // });

  // Photoswipe
  var $pswp = $('.pswp')[0];// necessary for Photoswipe
  var image = [];

  // Grabs all the images and places them into the items array
  $('.image-holder-inner').each( function() {
    var $pic = $(this),
      getItems = function() {
        var items = [];
        $pic.find('a').each(function() {
          var $href = $(this).attr('href'),
            $size = $(this).data('size').split('x'),
            $width = $size[0],
            $height = $size[1],
            $title = $(this).find('img').attr('alt');

          var item = {
            src : $href,
            w : $width,
            h : $height,
            title : $title
          }

          items.push(item);
        });
        return items;
      }
      var items = getItems();

      $.each(items, function(index, value) {
        image[index] = new Image();
        image[index].src = value['src'];
      });

      $pic.on('click', 'figure', function(event) {
        event.preventDefault();
        
        var $index = $(this).index();
        var options = {
          index: $index,
          bgOpacity: 0.7,
          showHideOpacity: true
        }

        var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
        lightBox.init();
      });
  });
  checkWidth();
  windowResize();
  // $(window).resize(checkWidth());
})(jQuery);






