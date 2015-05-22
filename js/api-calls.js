angular.module('myApp', [])

// API backend
.factory('apiCalls', ['$http', function ($http) {

	console.log("- factory 'apiFactory' loaded");

	var getData = function (requestedURL) {
		return $http.get(requestedURL);
	};
	return {
		getData: getData
	};
    
}]);