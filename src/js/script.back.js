function expandContent(contentbar, contentbutton, rightpos, rightmargin) {
    contentbar.animate({'right': rightpos}, 200).addClass('shown').removeClass('hiden');
    jQuery('#right').animate({'margin-right': rightmargin});
    jQuery('.top.sticky.nav').animate({'right': rightmargin});
    jQuery('body').css({
        'height': contentbar.outerHeight(),
        'overflow': 'hidden'
    })
    contentbutton.addClass('active');
}

function collapseContent(contentbar, contentbutton, rightpos, rightmargin) {
    contentbar.animate({'right': rightpos}, 200).addClass('hiden').removeClass('shown');
    jQuery('#right').animate({'margin-right': rightmargin});
    jQuery('.top.sticky.nav').animate({'right': rightmargin});
    jQuery('body').css({
        'height': 'auto',
        'overflow': 'auto'
    })
    contentbutton.removeClass('active');
}

/**
 * Expand the nav when nav menu clicked
 */
function expandNav() {
    expandContent(jQuery('.navbar'), jQuery('.toggle.nav'), '0', '15%');
}

/**
 * Collapse the nav when nav menu clicked
 */
function collapseNav() {
    collapseContent(jQuery('.navbar'), jQuery('.toggle.nav'), '-15%', '0');
}

/**
 * Expand the cart when cart menu clicked
 */
function expandCart() {
    expandContent(jQuery('.cartbar'), jQuery('.toggle.cart'), '0', '20%');
}

/**
 * Collapse the cart when cart menu clicked
 */
function collapseCart() {
    collapseContent(jQuery('.cartbar'), jQuery('.toggle.cart'), '-20%', '0');
}

/**
 * Expand the search when search menu clicked
 */
function expandSearch() {
    jQuery('.search.box').slideDown("fast", "easeOutBack").addClass('shown').removeClass('hiden');
    jQuery('.toggle.search').addClass('active');
    jQuery('.searchinput').focus();
}

/**
 * Collapse the search when search menu clicked
 */
function collapseSearch() {
    jQuery('.search.box').slideUp("fast", "easeInBack").addClass('hiden').removeClass('shown');
    jQuery('.toggle.search').removeClass('active');
}

/**
 * Expand the search when search menu clicked
 */
function expandSidebar() {
    expandContent(jQuery('.sidebar'), jQuery('.toggle.widget'), '0', '25%');
}

/**
 * Collapse the search when search menu clicked
 */
function collapseSidebar() {
    collapseContent(jQuery('.sidebar'), jQuery('.toggle.widget'), '-25%', '0');
}


/**
 * ==============================================================================
 * doc ready
 * ==============================================================================
 */
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
    jQuery('.toggle.nav').on('click', function (e) {
        e.preventDefault();
        if (jQuery('.navbar').hasClass('hiden')) {
            collapseSearch();
            collapseCart();
            collapseSidebar();
            expandNav();
        } else if (jQuery('.navbar').hasClass('shown')) {
            collapseNav();
        } else {
            collapseSearch();
            collapseCart();
            collapseSidebar();
            expandNav();
        }
    });

    /**
     * Toggle Search
     */
    jQuery('.toggle.search').on('click', function (e) {
        e.preventDefault();
        if (jQuery('.search.box').hasClass('hiden')) {
            collapseNav();
            collapseCart();
            collapseSidebar();
            expandSearch();
        } else if (jQuery('.search.box').hasClass('shown')){
            collapseSearch();
        } else {
            collapseNav();
            collapseCart();
            collapseSidebar();
            expandSearch();
        }
    })

    /**
     * Toggle Cart
     */
    jQuery('.toggle.cart').on('click', function (e) {
        e.preventDefault();
        if (jQuery('.cartbar').hasClass('hiden')) {
            collapseSearch();
            collapseNav();
            collapseSidebar();
            expandCart();
        } else if (jQuery('.cartbar').hasClass('shown')) {
            collapseCart();
        } else {
            collapseSearch();
            collapseNav();
            collapseSidebar();
            expandCart();
        }
    });

    /**
     * Toggle Sidebar
     */
    jQuery('.toggle.widget').on('click', function (e) {
        e.preventDefault();
        if (jQuery('.sidebar').hasClass('hiden')) {
            collapseSearch();
            collapseNav();
            collapseCart();
            expandSidebar();
        } else if (jQuery('.sidebar').hasClass('shown')) {
            collapseSidebar();
        } else {
            collapseSearch();
            collapseNav();
            collapseCart();
            expandSidebar();
        }
    });

    /**
     * Reset All Collapsible Items
     */
    jQuery('#left, #right').on('click', function (e) {
        if (jQuery('.shown').length > 0) {
            collapseNav();
            collapseSearch();
            collapseCart();
            collapseSidebar();
        } 

        jQuery('.shown').removeClass('shown');
        jQuery('.hiden').removeClass('hiden');
        jQuery('.active').removeClass('active');
    })

    /**
     * Toggle Masthead
     */
    jQuery('.toggle.masthead').on('click', function (e) {
        e.preventDefault();
        if(jQuery('#left').hasClass('masthidden')) {
            jQuery('#left').addClass('mastshown').removeClass('masthidden');
            jQuery('#right').animate({
                'margin-left': '0',
                'right': '100%'
            });
            jQuery('.search.box').animate({
                'left': '0'
            });
            jQuery('.top.nav').animate({
                'left': '15%',
                'right': '0'
            })
        } else if(jQuery('#left').hasClass('mastshown')) {
            jQuery('#left').addClass('masthidden').removeClass('mastshown');
            jQuery('#right').animate({
                'margin-left': '20%',
                'right': '80%'
            });
            jQuery('.search.box').animate({
                'left': '20%'
            });
            jQuery('.top.nav').css({
                'left': 'auto'
            })
        } else {
            jQuery('#left').addClass('mastshown').removeClass('masthidden');
            jQuery('#right').animate({
                'margin-left': '0',
                'right': '100%'
            });
            jQuery('.search.box').animate({
                'left': '0'
            });
            jQuery('.top.nav').animate({
                'left': '15%',
                'right': '0'
            })
        }
    });
    /**
     * Toggle Tooltip
     */
    jQuery('.sticky.nav').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });
});