(function($) {
  'use strict';

    /*---------------------------------------------------------------------
      Pre loader init
    ----------------------------------------------------------------------*/
    $(window).load(function() {
      $(".st-preloader-wave").delay(1000).fadeOut("slow");
      $("#st-preloader").delay(1000).fadeOut("slow").remove();
    });
    /*---------------------------------------------------------------------
      Wow init
    ----------------------------------------------------------------------*/
    if (typeof WOW == "function")
        new WOW().init();
    
    
    $(document).ready(function(){
        var topMenuHeight = "";
        var topMenuHeight = $("header").height();
        $(document).on('click', 'a[href^="#"]', function(e) {
            e.preventDefault();
            var Link = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(Link).offset().top - topMenuHeight+1
            }, 1000);
        });
    });

    setRandomClass();
    setInterval(function () {
        setRandomClass();
    }, 16000);

    function setRandomClass() {
        var teamList = $('.left-right');
        var teamItem = teamList.find('.logo-move');
        var number = teamItem.length;
        var random = Math.floor((Math.random() * number));
        if(teamItem.eq(random).hasClass('move_active')) {
            var random = random + 1
        }
        teamItem.eq(random).addClass('move_active')
            .siblings().removeClass('move_active');
    }

})(jQuery);

