/*
 *     MediaPlanner
 *     Copyright (C) 2015  Yannick Mauray
 *
 *     This program is free software; you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation; either version 2 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License along
 *     with this program; if not, write to the Free Software Foundation, Inc.,
 *     51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

(function(angular) {

    securedController.$inject = ['localStorageService', 'userDataStorageKey', 'lodash'];
    function securedController(localStorageService, userDataStorageKey, _) {
        var userData = localStorageService.get(userDataStorageKey);
        this.username = userData.username;
        this.roles = userData.roles;
        this.userData = userData;

        this.isAdmin = function() {
            return this.hasRole('ADMIN');
        };

        this.hasRole = function(role) {
            var picked = _.find(this.roles, function(e) {
                return e.authority == role;
            });
            return !_.isUndefined(picked);
        }
    }

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise(function($injector, $location) {
                var $state = $injector.get('$state');
                $state.go("home");
            })
        ;
        $stateProvider
            .state('secured', {
                abstract: true,
                data: {
                    secured: true
                },
                templateUrl: 'templates/ng-adminLTE/outside.html',
                controller: securedController,
                controllerAs: 'securedController'
            })
            .state('home', {
                parent: 'secured',
                url: '/home',
                template: '<p>Home page</p>',
                data: {
                    pageHeader: 'Home',
                    pageDescription: 'Description of home page'
                }
            })
        ;
    }

    angular
        .module('mrp.routes', ['ui.router', 'LocalStorageModule', 'mrp.auth', 'lodash'])
    ;

    angular
        .module('mrp.routes')
        .config(config)
    ;

})(window.angular);