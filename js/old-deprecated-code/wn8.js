'use strict';

angular.module('wotStats')

// WN8 calculation
.factory('wn8Factory', function ($window) {

	var wn8lib = {};

	console.log("- service 'wn8Factory' loaded");

	// example tank MT-25 / id: 16641

	// expected values - http://www.wnefficiency.net/exp/expected_tank_values_20.json
	var expDmg = "380.40";
	var expFrag = "0.52";
	var expSpot = "3.22";
	var expDef = "0.62";
	var expWinRate = "52.86";

	return {
		wn8calc: function (tankID, avgDmg, avgFrag, avgSpot, avgDef, avgWinRate) {

			console.log("loaded 'win8calc'");

			// update variables with recieved data
			var avgDmg = avgDmg;
			var avgFrag = avgFrag;
			var avgSpot = avgSpot;
			var avgDef = avgDef;
			var avgWinRate = avgWinRate;
			
			// step 1
			var rDAMAGE = avgDmg     / expDmg;
			var rFRAG   = avgFrag    / expFrag;
			var rSPOT   = avgSpot    / expSpot;
			var rDEF    = avgDef     / expDef;
			var rWIN    = avgWinRate / expWinRate;
			console.debug("DONE: calcStep1 / " +rDAMAGE+ "," +rFRAG+ "," +rSPOT+ "," +rDEF+ "," +rWIN);

			// step 2
			var rDAMAGEc = $window.Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
			var rFRAGc   = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.2, (rFRAG   - 0.12) / (1 - 0.12)));
			var rSPOTc   = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.1, (rSPOT   - 0.38) / (1 - 0.38)));
			var rDEFc    = $window.Math.max(0, $window.Math.min(rDAMAGEc + 0.1, (rDEF    - 0.10) / (1 - 0.10)));
			var rWINc    = $window.Math.max(0, (rWIN - 0.71) / (1 - 0.71));
			console.debug("DONE: calcStep2 / " +rDAMAGEc+ "," +rFRAGc+ "," +rSPOTc+ "," +rDEFc+ "," +rWINc);

			// step 3
			var wn8 = 980 * rDAMAGEc + 210 * rDAMAGEc * rFRAGc + 155 * rFRAGc*rSPOTc + 75 * rDEFc * rFRAGc + 145 * $window.Math.min(1.8,rWINc);
			var roundedWN8 = $window.Math.round(wn8 * 100) / 100;
			console.debug("DONE: calcStep3 / rounded WN8 = " + roundedWN8);

			return roundedWN8;
		}
	}
});