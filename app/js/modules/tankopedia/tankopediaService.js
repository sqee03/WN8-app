'use strict';

angular.module('tankopedia')

.factory('tankopediaService',
    function ($q, apiCalls, dataContractService, growl, _) {
        // Variables
        var dataContract = dataContractService.getDataContract();

        // TODO: It would be more performant to request info for all tanks at the begining,
        // store them in app then search within it for specific model

        /**
         * Get tankopedia description for requested tank
         *
         * @memberOf module:tankopedia
         * @param {Number} tankID - ID of requested tank
         * @returns {Object} general desrciption of tank
         */
        function getTankDescription(tankID) {
            var d = $q.defer();

            // Get average values
            apiCalls.getData(dataContract.tankopedia.description.url + tankID).then(function(tankDescription) {
                // Check if there are tank data in server response
                if (tankDescription.data[tankID]) {
                    var info = tankDescription.data[tankID];

                    d.resolve({
                        short_name: info.short_name_i18n,
                        full_name: info.localized_name,
                        icon: info.contour_image,
                        tier: info.level
                    });
                }
                else {
                    d.reject(false)
                }
            }).then(function(error) {
                d.reject(false)
            });

            return d.promise
        }

        return {
            getTankDescription: getTankDescription
        }
});