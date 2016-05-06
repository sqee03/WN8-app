'use strict';

angular.module('WN8')

.factory('WN8Service',
    function ($q, growl) {

        console.info("- service 'WN8Service' loaded");

        // Variables
        var wn8 = {};

        /**
         * Gets WN8 for a single tank
         *
         * @function getTankWN8
         * @param {Number} tankID - ID of tank
         * @returns {Number} WN8 value for requested tank
         */
        function getTankWN8(tankID) {
            // hey, here is my function code
        };

        /** setRatingColor controller */
        function setRatingColor(rating) {
            var d = $q.defer();

            if (rating || rating == 0) {
                // Set color for rating
                switch(true) {
                    case (rating < 2000):
                        wn8['color'] = '#930D0D';
                        break;
                    case (rating < 3000):
                        wn8['color'] = '#CD3333';
                        break;
                    case (rating < 4000):
                        wn8['color'] = '#CC7A00';
                        break;
                    case (rating < 5000):
                        wn8['color'] = '#CCB800';
                        break;
                    case (rating < 6000):
                        wn8['color'] = '#849B24';
                        break;
                    case (rating < 7000):
                        wn8['color'] = '#4D7326';
                        break;
                    case (rating < 8000):
                        wn8['color'] = '#4099BF';
                        break;
                    case (rating < 9000):
                        wn8['color'] = '#3972C6';
                        break;
                    case (rating < 10000):
                        wn8['color'] = '#793DB6';
                        break;
                    default:
                        wn8['color'] = '#401070';
                };
                d.resolve(wn8);
            }
            else {
                growl.error('Failed to set WN8 color. WN8 value is missing');
                d.reject(false);
            }

            return d.promise;
        };

        return {
            setRatingColor: setRatingColor,
            getTankWN8: getTankWN8
        }
});