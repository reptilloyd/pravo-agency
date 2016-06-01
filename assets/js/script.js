$(function() {
	// OPEN
	$( '[data-popup-open]' ).on('click', function(e){
		var targeted_popup_class = jQuery(this).attr( 'data-popup-open' );
		$( '[data-popup="' + targeted_popup_class + '"]' ).fadeIn(350);

		e.preventDefault();
	});

	// CLOSE
	$( '[data-popup-close]' ).on('click', function(e){
		var targeted_popup_class = jQuery(this).attr( 'data-popup-close' );
		$( '[data-popup="' + targeted_popup_class + '"]' ).fadeOut(350);

		e.preventDefault();
	});

	// CLOSE by Esc
	$(window).on('keydown', function(e){
		var targeted_popup_class = jQuery( '[data-popup-open]' ).attr( 'data-popup-open' );
		if ( e.keyCode === 27 ) {
			$( '[data-popup="' + targeted_popup_class + '"]' ).fadeOut(350);
		}
		e.stopPropagation();
	});
});




$( '.request-form' ).submit(function(e){
    e.preventDefault();
	var name  = $( '.request-form [name=request-name]' ),
		phone = $( '.request-form [name=request-phone]' ),
		email = $( '.request-form [name=request-email]' );

	if ( name.val() === '' ) {
		name.addClass( 'error' );
		return false;
	} else if ( ! validateEmail( email.val()) ) {
		email.addClass( 'error' );
		return false;
	} else if ( phone.val() === '' ) {
		phone.addClass( 'error' );
		return false;
	} else {
		return true;
	}

	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
});

// "instant"-check
$( '.request-form input[type="email"]' ).blur(function() {
	if( ! validateEmail( $(this).val()) ){
		$(this).addClass( 'error' );
	} else {
		$(this).removeClass( 'error' );
	}
});
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
