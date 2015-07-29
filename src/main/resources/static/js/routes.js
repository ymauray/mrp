(function(angular) {

    securedController.$inject = ['localStorageService', 'userDataStorageKey', 'lodash'];
    function securedController(localStorageService, userDataStorageKey, _) {
        var userData = localStorageService.get(userDataStorageKey);
        this.username = userData.username;
        this.roles = userData.roles;

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
            .otherwise('/home')
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