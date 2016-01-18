/*global angular: false, $: false*/
(function () {
	'use strict';

	/* App Module */

	var feedApp = angular.module('feedApp', [
	  'ngRoute',
	  'feedControllers',
	  'feedServices',
	  'feedFilters'
	]);

	feedApp.directive('resizeOnLoad', function () {
		return {
			link: function ($scope, $elem) {
				$elem[0].height = 20;
	            $elem.on('load', function () {
					var $this = $(this);
					if ($this.attr("src")) {
						$this.animate({
						 	height: $this.contents().height() + 50
						 }, 'fast')
						 .promise()
						 .then(function () {
						 	$('html, body').animate({
						 		scrollTop: $this.offset().top - 150
						 	}, 'slow');
						 });
					}
				});
			}
		};
	});

	feedApp.directive('scrollTo', function () {
		return {
			link: function ($scope, $elem, attrs) {
				$elem.on('click', function (evt) {
					evt.stopPropagation();

					var target = $(attrs.scrollTo),
						scrollPos = target.offset().top - 40;

					$('html, body').animate({scrollTop: scrollPos}, 'fast');
				});
			}
		};
	});
}());
