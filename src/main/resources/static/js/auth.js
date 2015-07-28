(function(angular) {

    run.$inject = ['$rootScope', '$state', 'lodash', 'authService'];
    function run($rootScope, $state, lodash, authService) {
        $rootScope.$on('$stateChangeStart', function securityCheck(event, toState, toParams, fromState, fromParams) {
            console.log('Security check');
            if (!lodash.isUndefined(toState.data) && toState.data.secured) {
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

    authServiceFactory.$inject = ['jwtHelper', 'localStorageService', 'tokenIdKey', 'lodash'];
    function authServiceFactory(jwtHelper, localStorageService, tokenIdKey, lodash) {

        function getToken() {
            return localStorageService.get(tokenIdKey);
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

        return {
            'isAuthenticated': isAuthenticated
        };
    }

    angular
        .module('mrp.auth', ['ngLodash', 'angular-jwt', 'LocalStorageModule'])
    ;

    angular
        .module('mrp.auth')
        .constant('tokenIdKey', 'token_id')
        .factory('authService', authServiceFactory)
        .run(run)
    ;

})(window.angular);