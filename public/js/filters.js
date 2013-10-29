'use strict';

angular.module('feedFilters', []).filter('simpleurl', function() {
  return function(url) {
    var cleaned = url.replace('http://', '').replace('https://', '').replace('www.', ''),
    	index = cleaned.indexOf('/');

    if (index) {
    	return cleaned.substring(0, index);
    } else {
    	return cleaned;
    }
  };
});
