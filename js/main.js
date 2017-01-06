(function($) {

  // header scroller
  $(window).scroll(() => {
    var scroll = $(window).scrollTop()
    if (scroll > 40) {
      $(".header").addClass("small")
    } else {
      $(".header").removeClass("small")
    }
  });

  // transition for the nav-icon to open and close
  $('#nav-icon').on('click', () => {
    $(this).toggleClass('open');
  });

  // spacing magnifies the out of alignment of the .nav-item on mobile
  // only checks on window load, so resizing has no part. Only really noticeable if
  // you cruise your desktop screen < 600 
  if($(window).width() < 769) {
    // console.log('small window');
    $('.nav-item').each(() => {
      $(this).html($(this).html().replace(/&nbsp;/gi,''));
    }); 
  }

  // var $twoClasses = $('.nav-name', '.nav-item');
  // $('#nav-name').on('mouseenter', function() {
  //   $(this).toggleClass('go-red');
  // })

  // off canvas panel
  var panelExample = $('#panel').scotchPanel({
    containerSelector: 'body', // Make this appear on the entire screen
    direction: 'right', // Make it toggle in from the right
    duration: 300, // ms speed of transition
    transition: 'ease',
    clickSelector: '#nav-icon', // Enables toggling when clicking elements of this class
    distanceX: '30%', // Size of the toggle
    enableEscapeKey: true // Clicking Esc will close the panel
  });

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
            $title = $(this).find('img').attr('alt'); //for captions inside pwsp which aren't currently used

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

})(jQuery);
