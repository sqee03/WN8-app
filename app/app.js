'use strict';

angular.module('wotStats', [
        // Libraries
        'ui.router',
        'ngAnimate',
        'momentjs',

        // Notifications
        'angular-growl',
        'notifications',

        // Template cache
        'templateCache',

        // App
        'playerInfo',
        'personalRating'
    ])

    .config(
        function($stateProvider, $urlRouterProvider) {

            // Routing
            $stateProvider
                // Init config files
                .state('app', {
                    abstract: true,
                    url: '',
                    template: '<ui-view/>',
                    resolve: {
                        config: function (configService) {
                            return configService.setConfig();
                        },
                        dataContract: function (dataContractService) {
                            dataContractService.setDataContract();
                        }
                    }
                })
                // Starting page
                .state('app.home', {
                    url: '/',
                    templateUrl: 'views/home.html'
                })
                // Player info
                .state('app.player', {
                    url: '/player',
                    controller: 'playerInfoCtrl',
                    templateUrl: 'js/modules/playerInfo/playerInfo.html'
                })
                // Default redirect
                $urlRouterProvider.otherwise("/");
    });