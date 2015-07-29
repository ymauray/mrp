(function(angular) {

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('users', {
                parent: 'secured',
                url: '/users',
                templateUrl: 'templates/users.html',
                data: {
                    pageHeader: 'Users and rights'
                }
            })
        ;

    }

    userServiceFactory.$inject = [];
    function userServiceFactory() {
        return {
        };
    }

    angular
        .module('mrp.users', ['mrp.routes'])
    ;

    angular
        .module('mrp.users')
        .config(config)
        .factory('userService', userServiceFactory)
    ;

})(window.angular);