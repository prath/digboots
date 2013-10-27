jQuery(document).ready(function () {
    'use strict';
    /**
     * Resize Jumbotron when window resizes
     */
    var $wh = jQuery(window).outerHeight();
    jQuery('.jumbotron').css('height', $wh);
    jQuery(window).on('resize', function () {
        var $wh = jQuery(window).outerHeight();
        jQuery('.jumbotron').css('height', $wh);
    });

    /**
     * Toggle Nav
     */
    jQuery('.toggle.button').on('click', function (e) {
        e.preventDefault();
        if (jQuery('.navbar').hasClass('hiden')) {
            jQuery('.navbar').animate({
                'right': '0%'
            });
            jQuery('#right').animate({
                'margin-right': '15%'
            });
            jQuery('body').css({
                'height': jQuery('.navbar').outerHeight(),
                'overflow': 'hidden'
            })
            jQuery('.navbar').addClass('shown');
            jQuery('.navbar').removeClass('hiden');
        } else if (jQuery('.navbar').hasClass('shown')) {
            jQuery('.navbar').animate({
                'right': '-15%'
            });
            jQuery('#right').animate({
                'margin-right': '0%'
            });
            jQuery('body').css({
                'height': 'auto',
                'overflow': 'auto'
            })
            jQuery('.navbar').addClass('hiden');
            jQuery('.navbar').removeClass('shown');
        } else {
            jQuery('.navbar').animate({
                'right': '0%'
            });
            jQuery('#right').animate({
                'margin-right': '15%'
            });
            jQuery('body').css({
                'height': jQuery('.navbar').outerHeight(),
                'overflow': 'hidden'
            })
            jQuery('.navbar').addClass('shown');
            jQuery('.navbar').removeClass('hiden');
        }
    });

    jQuery('#left, #right').on('click', function (e) {
        if (jQuery('.navbar').hasClass('hiden')) {
            
        } else if (jQuery('.navbar').hasClass('shown')) {
            jQuery('.navbar').animate({
                'right': '-15%'
            });
            jQuery('#right').animate({
                'margin-right': '0%'
            });
            jQuery('body').css({
                'height': 'auto',
                'overflow': 'auto'
            })
            jQuery('.navbar').addClass('hiden');
            jQuery('.navbar').removeClass('shown');
        }
    })

    /**
     * Scrollpane
     */
    // jQuery('.scroll-pane').jScrollPane();
});