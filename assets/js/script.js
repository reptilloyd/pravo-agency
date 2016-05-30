$(function() {
    //----- OPEN
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });

    //-----CLOSE by Esc
    $(window).on('keydown', function(e) {
      var targeted_popup_class = jQuery('[data-popup-open]').attr('data-popup-open');
      if (e.keyCode === 27) {
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
      }
      e.stopPropagation();
    });

});
