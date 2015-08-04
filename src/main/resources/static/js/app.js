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

    'use strict';

    appController.$inject = ['$rootScope', 'lodash'];
    function appController($rootScope, _) {
        var ctrl = this;

        ctrl.title = "MediaPlanner";

        $rootScope.$on('$stateChangeSuccess', function(element, toState/*, toStateParam*/) {
            if (!_.isUndefined(toState) && !_.isUndefined(toState['data'])) {
                ctrl.stateData = _.pick(toState['data'], ['pageHeader', 'pageDescription']);
                ctrl.title = "MediaPlanner - " + ctrl.stateData.pageHeader;
            } else {
                delete ctrl.stateData;
            }
        });
    }

    config.$inject = ['localStorageServiceProvider'];
    function config(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('mrp');
    }

    run.$inject = ["Restangular"];
    function run(Restangular) {
        Restangular.setBaseUrl('rest');
        Restangular.extendCollection('user', function(collection) {
            collection.addRestangularMethod('create', 'get', 'create');
            return collection;
        });
    }

    angular
        .module('mrp', [
            'mrp.auth',
            'mrp.routes',
            'mrp.users',
            'mrp.tables',
            'adminlte',
            'LocalStorageModule',
            'lodash',
            'restangular'])
    ;

    angular
        .module('mrp')
        .config(config)
        .run(run)
        .controller('AppController', appController)
    ;

})(window.angular);