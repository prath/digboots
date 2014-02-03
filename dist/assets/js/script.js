/**
 * ==============================================================================
 * doc ready
 * ==============================================================================
 */
$(document).ready(function() {
	'use strict';

	var $wh = $(window).outerHeight();

	/**
	 * Resize Jumbotron when window resizes
	 */
	$('.jumbotron').css('height', $wh);
	$(window).on('resize', function() {
		var $wh = $(window).outerHeight();
		$('.jumbotron').css('height', $wh);
	});

	/**
	 * Map Container Resize
	 */
	$('#map-canvas').css('height', $wh);
	$(window).on('resize', function() {
		var $wh = $(window).outerHeight();
		$('#map-canvas').css('height', $wh);
	});

	/**
	 * Toggle Collapsible Content.
	 * searchbox, navbar, cartbar, and sidebar expand-collapse
	 */
	$('.top.nav .toggle').on('click', function(e) {
		e.preventDefault();
		if (!$('body').hasClass('toggle' + $(this).attr('data-content'))) {
			$('body').removeAttr('class');
		}
		$('body').toggleClass('toggle' + $(this).attr('data-content'));
		$('.searchinput').focus();
	})

	/**
	 * collapse all collapsible content
	 */
	$('#left, #right').children(':not(".sidebar")').on('click', function(e) {
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

	/**
	 * Appear
	 */
	$('.appear').appear();

	$(document.body).on('appear', '.appear', function(e, $affected) {
		$affected.each(function(i) {
			var $current = $(this),
				$delay = i * 50;
			$current.delay($delay).queue(function() {
				$current.addClass('animate');
			})
		})
	});

	/**
	 * FLexislider
	 */
	$('.flexslider').flexslider({
		animation: "slide",
		animationLoop: false,
		itemWidth: 88,
		itemMargin: 0,
		pausePlay: false,
		selector: ".client-slides > li",
		directionNav: false,
		start: function(slider) {}
	});

	/**
	 * Google Map
	 */
	var mapOptions = {
		zoom: 15,
		scrollwheel: false,
		center: new google.maps.LatLng(40.64432, -74.01107),
		// zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.LEFT_TOP
		},
		// scaleControl: false,
		scaleControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_LEFT
		},
		streetViewControl: false,
		panControl: false,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

});
