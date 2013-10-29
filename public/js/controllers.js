'use strict';

var feedControllers = angular.module('feedControllers', []);

feedControllers.controller('FeedListCtrl', ['$scope', 'Feeds',
	function ($scope, Feeds) {
		$scope.feeds = Feeds.query();
	}]);

feedControllers.controller('FeedDetailCtrl', ['$scope', '$routeParams', 'Feeds', '$sce',
	function ($scope, $routeParams, Feeds, $sce) {
		Feeds.get({feedId: $routeParams.feedId}, function (feed) {
			
			feed.data.items.forEach(function (f) {
				f.summary = $sce.trustAsHtml(f.summary);
			});
			$scope.feed = feed;
			
		});
	}]);
