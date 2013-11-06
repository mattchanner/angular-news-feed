'use strict';

var feedControllers = angular.module('feedControllers', []);

feedControllers.controller('FeedListCtrl', ['$scope', 'Feeds',
	function ($scope, Feeds) {
		$scope.feeds = Feeds.query();
	}]);

feedControllers.controller('FeedDetailCtrl', ['$scope', '$routeParams', 'Feeds', '$sce',
	function ($scope, $routeParams, Feeds, $sce) {
		Feeds.get({feedId: ($scope.feed ? $scope.feed.id : null)}, function (feed) {
			
			feed.data.items = feed.data.items.slice(0, 10);			
			feed.data.items.forEach(function (f) {
				f.summaryUrl = $sce.trustAsResourceUrl(f.url);
			});
			$scope.feed = feed;			
		});

		$scope.activeItem = null;

		$scope.itemclick = function (feedItem) {
			$scope.activeItem = feedItem;
			$scope.summaryUrl = feedItem.summaryUrl;
		};

		$scope.summaryOrBlank = function (feedItem) {

			if (feedItem === $scope.activeItem) {
				return feedItem.summaryUrl;
			}
		};
	}]);
