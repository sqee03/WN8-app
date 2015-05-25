angular.module('myApp')

// load tank info from Wiki (Tankopedia)
.factory('tankInfo', ['apiCalls', function (apiCalls) {

	console.log("- service 'tankInfo' loaded");

	var tankName, tankImg;

	// TO DO: load URL from config file
	var urlTankInfo = "https://api.worldoftanks.eu/wot/encyclopedia/tankinfo/?application_id=9bd08e6ff7ffc96322e85e13cbd863c5&tank_id=";

	return {
		getTankInfo: function (tankID) {
		console.log("loaded 'tankInfo'");

		apiCalls.getData(urlTankInfo + tankID)
			.success(function (response) {

				tankName = response.data[tankID].localized_name;
				tankImg = response.data[tankID].image;

				console.debug("tank name for " + tankID + " : " + tankName);
				console.debug("tank img for " + tankID + " : " + tankImg);

				return {
					tankName : tankName,
					tankImg : tankImg
				}
			})
			.error(function () {
				// something
				console.error("tankInfo service request failed");
			});
		}
	}
}]);