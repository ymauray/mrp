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

    loginController.$inject = ['$scope', 'authService', '$window', '$state', '$location'];
    function loginController($scope, authService, $window, $state, $location) {
        var ctrl = this;
        ctrl.processing = false;
        ctrl.error = false;
        ctrl.login = function() {
            ctrl.processing = true;
            authService.authenticate(ctrl.username, ctrl.password, ctrl.token).then(function success() {
                console.log('Login successfull');
                var url = $location.absUrl();
                $window.location = url + "/..";
            }, function failure() {
                console.log('Login failed');
                ctrl.error = true;
                ctrl.processing = false;
                angular.element('[autofocus]').focus();
                angular.element('[autofocus]').select();
            });
        };

        $scope.$watch(function() { return ctrl.username  + ctrl.password + ctrl.token }, function() {
            ctrl.error = false;
        });
    }

    config.$inject = ['localStorageServiceProvider', '$stateProvider'];
    function config(localStorageServiceProvider, $stateProvider) {
        localStorageServiceProvider.setPrefix('mrp');
        $stateProvider
            .state('home', {
                url: '/home'
            })
        ;
    }

    run.$inject = ['localStorageService', 'tokenStorageKey', 'userDataStorageKey', 'Restangular'];
    function run(localStorageService, tokenStorageKey, userDataStorageKey, Restangular) {
        localStorageService.remove(tokenStorageKey);
        localStorageService.remove(userDataStorageKey);
        Restangular.setBaseUrl('rest');
    }

    angular
        .module('mrp.login', ['mrp.auth', 'LocalStorageModule', 'ui.router', 'restangular'])
    ;

    angular
        .module('mrp.login')
        .controller('LoginController', loginController)
        .config(config)
        .run(run)
    ;

})(window.angular);