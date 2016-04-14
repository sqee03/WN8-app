angular.module('myApp')

.controller('myCtrl', function ($scope, $q, $window, projectService, apiCalls, playerIDService, playerInfoService, tankInfo, tankStats, expectedTankStats, wn8Factory, searchJSON) {


	// Default region
	$scope.region = { server: "eu" };

	// Watch region switching
	$scope.$watch('region.server', function() {
		if ($scope.region.server == "com") {
			$scope.region.appID = "16924c431c705523aae25b6f638c54dd"; // need to update with my own appID for NA
			console.debug("region changed:" + $scope.region.server + ", appID: " + $scope.region.appID);
		}
		if ($scope.region.server == "eu") {
			$scope.region.appID = "9bd08e6ff7ffc96322e85e13cbd863c5";
			console.debug("default region:" + $scope.region.server + ", appID: " + $scope.region.appID);
		}
		// update URL for API
		$scope.urlPlayerID = "https://api.worldoftanks." + $scope.region.server + "/wot/account/list/?application_id=" + $scope.region.appID + "&search=";
		$scope.urlPlayerInfo = "https://api.worldoftanks." + $scope.region.server + "/wot/account/info/?application_id=" + $scope.region.appID + "&account_id=";
		$scope.urlPlayerTankStats = "https://api.worldoftanks." + $scope.region.server + "/wot/tanks/stats/?application_id=" + $scope.region.appID + "&account_id=";
		$scope.urlTankInfo = "https://api.worldoftanks." + $scope.region.server + "/wot/encyclopedia/tankinfo/?application_id=" + $scope.region.appID + "&tank_id=";
	});



	// Expected tank values
	var urlExpextedTankValues = "json/expected_tank_values_20.json"; // define where is your JSON stored localy


	// -----------------------------------------------------------------------------------------------------------------
	// project config

	var loadConfig = function() {
		var promise = projectService.loadConfig('json/config.json');
		promise.then(function(response) {
			$scope.appID = response.app_id;
			console.debug($scope.appID);
		});
	};

	loadConfig();

//		$scope.appID = response.data[0];



  	// -----------------------------------------------------------------------------------------------------------------
	// get player ID and use it for next API call
	$scope.getPlayerID = function(playerName) {

		playerIDService.getPlayerID(playerName).then(function(data) {
			// promise resolved
			$scope.playerID = data;
		}, function(error) {
			// promise rejected
			console.error(error);
		});
	}


  	// -----------------------------------------------------------------------------------------------------------------
	// get player info for requested player ID
	var getPlayerInfo = function () {
		apiCalls.getData($scope.urlPlayerInfo + playerID)
			.success(function (response) {
				return $scope.Calc(response, playerID, "player");
	  	})
	  		.error(function () {
	  		// something
	  	});
	};


  	// -----------------------------------------------------------------------------------------------------------------
  	// display recent tank data from API
	$scope.showRecentStats = function (data) {
		console.log("function 'showRecentStats' loaded");

    	$scope.yourStats = data;

    	console.debug("recieved variables: avgDmg:" + avgDmg + ", avgFrag:" + avgFrag + ", avgSpot:" + avgSpot + ", avgDef:" + avgDef);
  	};


  	// -----------------------------------------------------------------------------------------------------------------
  	// Load recent player stats for requested tank


  	$scope.execute = function(tankID) {
    	return $scope.loadRecentStats(tankID).then($scope.loadExpectedStats(tankID)).then(function() { // call 'loadRecentStats' and wait untill it updates variables 

    		console.log("loaded 'execute'");

    		// testing
      		$scope.expectedValues = expectedData;
      		$scope.recentValues = recentData;

      		// return $scope.displayWN8(tankID, avgDmg, avgFrag, avgSpot, avgDef, avgWinRate); // call 'showRecentStats' with updated param 'apiData'
    	});
  	}





  	// -----------------------------------------------------------------------------------------------------------------
	// WN8 calculation for specific tank
	$scope.displayWN8 = function (tankID, avgDmg, avgFrag, avgSpot, avgDef, avgWinRate) {
		console.log("loaded 'displayWN8'");
		console.debug("recieved variables: avgDmg:" + avgDmg + ", avgFrag:" + avgFrag + ", avgSpot:" + avgSpot + ", avgDef:" + avgDef + ", avgWinRate:" + avgWinRate);

		$scope.wn8 = wn8Factory.wn8calc(tankID, avgDmg, avgFrag, avgSpot, avgDef, avgWinRate);
	};


  	// -----------------------------------------------------------------------------------------------------------------
	// Get tank info from Tankopedia
	$scope.showTankInfo = function() {
		tankInfo.getTankInfo("16641");
	};


});