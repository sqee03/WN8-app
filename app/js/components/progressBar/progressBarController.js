'use strict';

angular.module('components')

.controller('progressBarCtrl',
    function ($scope, apiCalls) {
        /**
         * Display progress bar
         *
         * @memberOf module:components
         */
        var bar = new ProgressBar.Circle(progress, {
          color: '#aaa',
          // This has to be the same size as the maximum width to
          // prevent clipping
          strokeWidth: 4,
          trailWidth: 1,
          easing: 'easeInOut',
          duration: 1400,
          text: {
            autoStyleContainer: false
          },
          from: { color: '#8401A0', width: 1 },
          to: { color: '#FF08E9', width: 2 },
          // Set default step function for all animate calls
          step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value + ' %');
            }

          }
        });
        bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        bar.text.style.fontSize = '2rem';

        bar.animate(1.0);  // Number from 0.0 to 1.0




        $scope.test = function() {
            console.info('started test');

            apiCalls.getData('http://jsonplaceholder.typicode.com/photos').then(function(data) {
                console.info('test finished: ', data);
            });
        }
});