function startup() {
    //Smooth scrolling
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1600);
        }
    });
    //add and remove parralax on scroll
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var os = $('#first-panel').offset().top;
        var ht = $('#first-panel').height();
        if (scroll > os + ht) {
            $('#first-image').removeClass('first-image');
        }
        else {
            $("#first-image").addClass("first-image");
        }
    });

    //sliding up navbar
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('nav').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('nav').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('nav').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    }
    setTimeout(hidefirst, 2000); //wait 2.5 seconds to hide first fact. Fade out takes 1 second
    
    setTimeout(showSecond,3000 ); // show second after 3.5 seconds 
    //display for 2 seconds
    setTimeout(hideSecond,7500 ); // hide second after 6 seconds Fade out takes 1 second
    setTimeout(showThird, 8500);
    setTimeout(hideThird, 10500);
    setTimeout(removeBlackScreen, 10500);
    setTimeout(showFinal, 11500);
    setTimeout(addNavbar, 11500);
  
    
}


function extra() {
    var wow = new WOW();
    wow.init();

    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1600);
        }
    });
   
}

function hidefirst(){
    $("#1").removeClass("fadeIn").addClass("fadeOut hidden");
}
function showSecond(){
    $("#2").addClass("fadeIn visible");
}
function hideSecond(){
    $("#2").addClass("fadeOut hidden");
}
function showThird(){
    $("#3").addClass("fadeIn visible");
}
function hideThird(){
    $("#3").addClass("fadeOut hidden");
}
function showFinal(){
    $("#4").addClass("fadeIn visible");
}
function removeBlackScreen(){
    $("#blackScreen").addClass("fadeOut hidden");
}
function addNavbar(){
    $("#nav").removeClass("indexNav").addClass("animated fadeIn visible")
}
