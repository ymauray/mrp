(function(angular) {

    config.$inject = ['$stateProvider'];
    function config($stateProvider, Restangular) {
        $stateProvider
            .state('users', {
                parent: 'secured',
                url: '/users',
                templateUrl: 'templates/users.html',
                data: {
                    pageHeader: 'Users and rights'
                },
                resolve: {
                    users: ['Restangular', function(Restangular) {
                        return Restangular.all('user').getList();
                    }]
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
        .module('mrp.users', ['mrp.routes', 'restangular'])
    ;

    angular
        .module('mrp.users')
        .config(config)
        .factory('userService', userServiceFactory)
    ;

})(window.angular);