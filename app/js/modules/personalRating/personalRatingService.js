'use strict';

angular.module('personalRating')

.factory('personalRatingService',
    function ($q, growl) {

        console.info("- service 'personalRatingService' loaded");

        // Variables
        var personalRating = {};

        function getPersonalRating(rating) {
            var d = $q.defer();

            if (rating || rating == 0) {
                // Set color for rating
                switch(true) {
                    case (rating < 2000):
                        personalRating['color'] = '#930D0D';
                        break;
                    case (rating < 3000):
                        personalRating['color'] = '#CD3333';
                        break;
                    case (rating < 4000):
                        personalRating['color'] = '#CC7A00';
                        break;
                    case (rating < 5000):
                        personalRating['color'] = '#CCB800';
                        break;
                    case (rating < 6000):
                        personalRating['color'] = '#849B24';
                        break;
                    case (rating < 7000):
                        personalRating['color'] = '#4D7326';
                        break;
                    case (rating < 8000):
                        personalRating['color'] = '#4099BF';
                        break;
                    case (rating < 9000):
                        personalRating['color'] = '#3972C6';
                        break;
                    case (rating < 10000):
                        personalRating['color'] = '#793DB6';
                        break;
                    default:
                        personalRating['color'] = '#401070';
                };
                d.resolve(personalRating);
            }
            else {
                growl.error('Failed to set additional info for personal rating. Input PR value is missing.');
                d.reject(false);
            }

            return d.promise;
        };

        return {
            getPersonalRating: getPersonalRating
        }
});