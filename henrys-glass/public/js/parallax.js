(function(window, $){
  var topOfLogo = $('#main-logo').offset().top
  var heightOfLogo = $('#main-logo').height()

  function resizeNavbarBrand(fractionOfTotalSize) {
    var width = 300 * fractionOfTotalSize;
    var height = 67 * fractionOfTotalSize;
    $('.navbar-brand').css({width: width + 'px', height: height + 'px'})
  }

  function resizeNavBarByScrollLocation() {
    var navbarHeight = $('nav.navbar').height()
    var scrollLoc = $(window).scrollTop()
    if ($('#main-logo').css('display') === 'none') {
      resizeNavbarBrand(1)
    } else if (scrollLoc + navbarHeight >= topOfLogo + heightOfLogo) {
      $('#nav-tel').css({visibility: 'visible'})
      resizeNavbarBrand(1)
    } else if (scrollLoc + navbarHeight >= topOfLogo) {
      var fractionOfSize = (scrollLoc + navbarHeight - topOfLogo) / heightOfLogo
      fractionOfSize = fractionOfSize > 1 ? 1 : fractionOfSize
      resizeNavbarBrand(fractionOfSize)
      $('#nav-tel').css({visibility: 'hidden'})
    } else {
      resizeNavbarBrand(0)
      $('#nav-tel').css({visibility: 'hidden'})
    }
  }

  $(window).scroll(function() {
    resizeNavBarByScrollLocation()
  })

  $(window).resize(function(e) {
    if ($(window).width() <= 767) {
      resizeNavbarBrand(1)
    } else {
      resizeNavBarByScrollLocation()
    }
  })


  // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    $('#navbarsExampleDefault').removeClass('show')
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 83
        }, 1000, function() {
          var x = window.scrollX, y = window.scrollY;
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          window.scrollTo(x, y);
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
            window.scrollTo(x, y);
          };
        });
      }
    }
  });

}(window, jQuery))
