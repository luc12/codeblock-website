
function activateBurgerMenu() {
  var cancelEvent = function(e) {
    e.preventDefault();
  };

  $('.menu-burger, .menu-items').on('click', function() {
    $('.menu-items, .menu-burger').toggleClass('fs');
    $('.menu-burger').toggleClass('menu-open');

    // Disable scrolling while menu is open
    if($('.menu-burger').hasClass('menu-open')) {
      $('body').bind('mousewheel', cancelEvent);
      $('body').bind('touchmove', cancelEvent);
    }
    else {
      $('body').unbind('mousewheel');
      $('body').unbind('touchmove');
    }
  });
}

function attachNavBarScroll() {
  var header = $('header');
  if(!header)
    return;
  
  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = header.outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $('body').scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      $('header').removeClass('nav-down').addClass('nav-up');
    }
    else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
        $('header').removeClass('nav-up').addClass('nav-down');
      }
    }
    
    lastScrollTop = st;
  }
}
