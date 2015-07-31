(function(angular) {

    userController.$inject = ['users'];
    function userController(users) {
        var ctrl = this;
        ctrl.users = users;
        ctrl.select = function(user) {
            user.tableItem = user.tableItem || {selected: false};
            user.tableItem.selected = !user.tableItem.selected;
            user.status = 'error';
        };
        ctrl.edit = function(user, property) {
            console.log("edit " + property);
        }
    }

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
                },
                controller: userController,
                controllerAs: 'userController'
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