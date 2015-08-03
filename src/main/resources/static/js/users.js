(function(angular) {

    userController.$inject = ['users', '$q', '$timeout', 'validation', 'lodash'];
    function userController(users, $q, $timeout, validation, _) {
        var ctrl = this;
        ctrl.users = users;
        ctrl.select = function(user) {
            user.tableItem = user.tableItem || {selected: false};
            user.tableItem.selected = !user.tableItem.selected;
            user.status = 'error';
        };
        ctrl.edit = function(user, property) {
            console.log("edit " + property);
        };
        ctrl.validate = function(user) {
            return $q(function(resolve, reject) {
                $timeout(function() {
                    var validationSupport = validation.getValidationSupport();
                    if (_.isEmpty(user.username)) {
                        validationSupport.addError('username', 'Username is mandatory');
                    }
                    resolve(validationSupport.getValidationResult());
                });
            });
        };
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
        .module('mrp.users', ['mrp.routes', 'restangular', 'validation'])
    ;

    angular
        .module('mrp.users')
        .config(config)
        .factory('userService', userServiceFactory)
    ;

})(window.angular);