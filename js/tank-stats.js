angular.module('myApp', []);

// API backend
.factory('tankStats', ['apiCalls', function (apiCalls) {

	console.log("- factory 'tankStats' loaded");

	return {
		something: function() {
			// Load recent player stats for requested tank

			// Default variable pre-set
			var loaded = null;

			var recendData, avgDmg, avgFrag, avgSpot, avgDef, avgWinRate;

			var loadRecentStats = function(tankID) {
		    	if (loaded == null) // continue if variable is not defined yet
		      		loaded = apiCalls.getData($scope.urlPlayerTankStats + playerID + "&tank_id=" + tankID) // call API backend
		        	.then(function(backendResponse) { // use API response to define variable

		        		recentData = backendResponse.data.data[playerID][0].all;
						var battles = recentData.battles;
		        		
		        		// temporary saving filtered API data
					    avgDmg = recentData.damage_dealt / battles;
						avgFrag = recentData.frags / battles;
						avgSpot = recentData.spotted / battles;
						avgDef = recentData.dropped_capture_points / battles;
						avgWinRate = (recentData.wins / battles) * 100;

						console.debug("recent values(API) for '" + tankID + "': avgDmg:" + avgDmg + ", avgFrag:" + avgFrag + ", avgSpot:" + avgSpot + ", avgDef:" + avgDef + ", avgWinRate:" + avgWinRate);
		        	});

		        console.log("loaded 'loadRecentStats'");

		    	return loaded; // return redefined variable
		  	}
		}
	}
    
}]);