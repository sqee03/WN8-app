var app = angular.module('myApp');

// WN8 calculation
app.factory('searchJSON', function () {

	var searchJSON = { working : "no" };

	console.log("- service 'searchJSON' loaded");

	


	searchJSON.findObj = function(searchSource, searchKey, searchValue) {
		console.log("loaded 'findObj' - source:" + searchSource + " key:" + searchKey + ", value:" + searchValue);

	    angular.forEach(searchSource, function(key, value) { // check conditions in loop for each object in 'data'
	    	// value = number of object in JSON
	    	// key = content of object

	        if (key[searchKey] == searchValue) { // if searched object key('searchKey') match with searched value('searchValue')

	            console.debug("CORRECT MATCH - returning results for '" + searchKey + "': " + searchValue)

	            return "no"
	        }
	        else {
	        	console.error("SKIPPED: '" + searchKey + "':'" + key[searchKey] + "' does not match with searched '" + searchValue + "'")
	        }

	        return "ok"
	    });
	};

    return searchJSON;
});