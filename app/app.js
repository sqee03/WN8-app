'use strict';

angular.module('wotStats', [
        'ui.router'
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
                    //controller: 'homeCtrl',
                    //templateUrl: 'views/home.html',
                    resolve: {
                        config: function (configService) {
                            console.log('1) about to load config.json');
                            return configService.setConfig();
                        },
                        dataContract: function (dataContractService) {
                            console.log('1) about to setDataContract');
                            dataContractService.setDataContract();
                        }
                    }
                })
                // Player info
                .state('app.player', {
                    url: '/player',
                    controller: 'playerInfoCtrl',
                    templateUrl: 'modules/playerInfo/playerInfo.html'
                })
                // Default redirect
                $urlRouterProvider.otherwise("/default_redirect");
    });