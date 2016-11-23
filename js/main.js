(function($) {
  
  $(window).scroll(function () {
    var scroll = $(window).scrollTop()
    if (scroll > 100) {
      $(".header").addClass("small")
    } else {
      $(".header").removeClass("small")
    }
  });


  var $pswp = $('.pswp')[0];// necessary for Photoswipe
  var image = [];

  $('.image-holder-inner').each( function() {
    var $pic = $(this),
      getItems = function() {
        var items = [];
        // console.log(items);
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
})(jQuery);




