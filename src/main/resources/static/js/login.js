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

    loginController.$inject = ['$scope', 'authService', '$window'];
    function loginController($scope, authService, $window) {
        var ctrl = this;
        ctrl.processing = false;
        ctrl.error = false;
        ctrl.login = function() {
            ctrl.processing = true;
            authService.authenticate(ctrl.username, ctrl.password, ctrl.token).then(function success() {
                console.log('Login successfull');
                $window.location = "..";
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

    config.$inject = ['localStorageServiceProvider'];
    function config(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('mrp');
    }

    run.$inject = ['localStorageService', 'tokenStorageKey', 'userDataStorageKey'];
    function run(localStorageService, tokenStorageKey, userDataStorageKey) {
        localStorageService.remove(tokenStorageKey);
        localStorageService.remove(userDataStorageKey);
    }

    angular
        .module('mrp.login', ['mrp.auth', 'LocalStorageModule'])
    ;

    angular
        .module('mrp.login')
        .controller('LoginController', loginController)
        .config(config)
        .run(run)
    ;

})(window.angular);