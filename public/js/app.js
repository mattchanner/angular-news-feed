'use strict';

/* App Module */

var feedApp = angular.module('feedApp', [
  'ngRoute',
  
  'feedControllers',
  'feedServices'
]);

feedApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/feeds', {
        templateUrl: 'partials/feed-list.html',
        controller: 'FeedListCtrl'
      })
      .when('/feeds/:feedId', {
        templateUrl: 'partials/feed-detail.html',
        controller: 'FeedDetailCtrl'
      })
      .otherwise({
        redirectTo: '/feeds'
      });
  }]);
