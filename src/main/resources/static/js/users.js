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

    userController.$inject = ['users', '$q', '$timeout', 'validation', 'Restangular', 'lodash'];
    function userController(users, $q, $timeout, validation, Restangular, _) {
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
        ctrl.create = function() {
            Restangular.all('user').create().then(function(newUser) {
                ctrl.users.push(newUser);
            })
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
        .module('mrp.users', ['mrp.routes', 'restangular', 'validation'])
    ;

    angular
        .module('mrp.users')
        .config(config)
        .factory('userService', userServiceFactory)
    ;

})(window.angular);