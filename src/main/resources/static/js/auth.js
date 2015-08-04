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

    run.$inject = ['$rootScope', '$state', 'authService', 'Restangular', '$window', 'lodash'];
    function run($rootScope, $state, authService, Restangular, $window, _) {

        Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
            var token = authService.getToken();
            if (!_.isEmpty(token)) {
                headers['X-Auth-Token'] = authService.getToken();
            }
            return {
                headers: headers
            }
        });

        $rootScope.$on('$stateChangeStart', function securityCheck(event, toState, toParams, fromState, fromParams) {
            console.log('Security check');
            if (!_.isUndefined(toState.data) && toState.data.secured) {
                console.log('State ' + toState.name + ' is secured');
                if (authService.isAuthenticated()) {
                    console.log('User is authenticated, moving forward');
                } else {
                    console.log('User is NOT authenticated, redirecting to login page');
                    event.preventDefault();
                    $window.location = 'login';
                }
            }
        })
    }

    authServiceFactory.$inject = ['jwtHelper', 'localStorageService', 'tokenStorageKey', 'userDataStorageKey', 'lodash', 'Restangular', '$q'];
    function authServiceFactory(jwtHelper, localStorageService, tokenStorageKey, userDataStorageKey, lodash, Restangular, $q) {

        function getToken() {
            return localStorageService.get(tokenStorageKey);
        }

        function isAuthenticated() {
            console.log('isAuthenticated ?');
            var authenticated = false;
            var token = getToken();
            if (!lodash.isNull(token) && !jwtHelper.isTokenExpired(token)) {
                authenticated = true;
            }
            console.log('isAuthenticated : ' + authenticated);
            return authenticated;
        }

        function authenticate(username, password, token) {
            return Restangular
                .all('authenticate')
                .post({username: username, password: password, token: token})
                .then(function resolve(data) {
                    if (!_.isEmpty(data.token)) {
                        localStorageService.set(tokenStorageKey, data.token);
                        localStorageService.set(userDataStorageKey, jwtHelper.decodeToken(data.token));
                    } else {
                        return $q.reject(data.message);
                    }
                }, function reject(reason) {
                    return $q.reject(reason);
                })
        }

        return {
            'isAuthenticated': isAuthenticated,
            'authenticate': authenticate,
            'getToken': getToken
        };
    }

    angular
        .module('mrp.auth', ['ngLodash', 'angular-jwt', 'LocalStorageModule', 'restangular', 'ui.router'])
    ;

    angular
        .module('mrp.auth')
        .constant('tokenStorageKey', 'token')
        .constant('userDataStorageKey', 'userData')
        .factory('authService', authServiceFactory)
        .run(run)
    ;

})(window.angular);