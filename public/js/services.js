'use strict';

var feedServices = angular.module('feedServices', ['ngResource']);

feedServices.factory('Feeds', ['$resource',
	function ($resource) {
		return $resource('/feeds/:feedId', {}, {			
		});
	}]);