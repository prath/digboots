/**
 * ==============================================================================
 * doc ready
 * ==============================================================================
 */
$(document).ready(function () {
    'use strict';

    var $wh = $(window).outerHeight();

    /**
     * Resize Jumbotron when window resizes
     */
    $('.jumbotron').css('height', $wh);
    $(window).on('resize', function () {
        var $wh = $(window).outerHeight();
        $('.jumbotron').css('height', $wh);
    });

    /**
     * Toggle Collapsible Content.
     * searchbox, navbar, cartbar, and sidebar expand-collapse
     */
    $('.top.nav .toggle').on('click', function(e){
        e.preventDefault();
        if(!$('body').hasClass('toggle' + $(this).attr('data-content'))) {
            $('body').removeAttr('class');
        }
        $('body').toggleClass('toggle' + $(this).attr('data-content'));
        $('.searchinput').focus();
    })

    /**
     * collapse all collapsible content
     */
    $('#left, #right').children(':not(".sidebar")').on('click', function (e) {
        $('body').removeAttr('class');
    });

    
    /**
     * Toggle Tooltip
     */
    $('.sticky.nav').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    /**
     * FitVids
     */
    $(".fitvids").fitVids();
});