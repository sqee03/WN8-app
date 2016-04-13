'use strict';

angular.module('wotStats', [
        'ui.router',
        'angular-loading-bar'
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
                    url: '/home',
                    templateUrl: 'views/home.html'
                })
                // Player info
                .state('app.player', {
                    url: '/player',
                    controller: 'playerInfoCtrl',
                    templateUrl: 'modules/playerInfo/playerInfo.html'
                })
                // Default redirect
                $urlRouterProvider.otherwise("/home");
    });