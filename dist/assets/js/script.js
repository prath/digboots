jQuery(document).ready(function(){
    jQuery('.masthead').fadeIn();

    var $wh = jQuery(window).outerHeight();
    jQuery('.jumbotron').css('height', $wh);
    jQuery(window).on('resize', function(){
    	var $wh = jQuery(window).outerHeight();
    	jQuery('.jumbotron').css('height', $wh)
    });

});