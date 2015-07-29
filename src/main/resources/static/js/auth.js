(function(angular) {

    run.$inject = ['$rootScope', '$state', 'authService', 'Restangular', 'lodash'];
    function run($rootScope, $state, authService, Restangular, _) {

        Restangular.setBaseUrl('/rest');
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
                    $state.go('login');
                    event.preventDefault();
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

        function authenticate(username, password) {
            return Restangular
                .all('authenticate')
                .customPOST({}, '', {'username': username, 'password': password})
                .then(function success(data) {
                    localStorageService.set(tokenStorageKey, data.token);
                    localStorageService.set(userDataStorageKey, jwtHelper.decodeToken(data.token));
                }, function failure(reason) {
                    return $q.reject(reason);
                });
        }

        return {
            'isAuthenticated': isAuthenticated,
            'authenticate': authenticate,
            'getToken': getToken
        };
    }

    angular
        .module('mrp.auth', ['ngLodash', 'angular-jwt', 'LocalStorageModule', 'restangular'])
    ;

    angular
        .module('mrp.auth')
        .constant('tokenStorageKey', 'token')
        .constant('userDataStorageKey', 'userData')
        .factory('authService', authServiceFactory)
        .run(run)
    ;

})(window.angular);