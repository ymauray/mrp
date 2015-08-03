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

'use strict';

(function(angular) {

    mrpTable.$inject = [];
    function mrpTable() {
        return {
            restrict: 'C',
            scope: {
                selectionMode: '@'
            },
            controller: function() {},
            controllerAs: 'tableController',
            bindToController: true
        }
    }

    mrpTableRow.$inject = ['$timeout', '$q', 'validation'];
    function mrpTableRow($timeout, $q, validation) {
        return {
            restrict: 'E',
            require: ['tr', '^^table'],
            scope: {
                object: '=',
                validator: '&'
            },
            controller: function() {
                var ctrl = this;
                ctrl.getValidator = function() {
                    var v = ctrl.validator();
                    if (!angular.isUndefined(v)) {
                        return v;
                    } else {
                        return function() {
                            return $q(function(resolve, reject) {
                                var validationSupport = validation.getValidationSupport();
                                resolve(validationSupport.getValidationResult());
                            });
                        }
                    }
                };
                ctrl.validate = function() {
                    if (angular.isUndefined(ctrl.object)) return;
                    return ctrl.getValidator().apply(null, [ctrl.object]).then(function resolved(result) {
                        ctrl.object.status = result.status;
                        return $q(function(resolve, reject) {
                            if (result.errors.length == 0) {
                                resolve();
                            } else {
                                reject();
                            }
                        });
                    });
                };
                ctrl.save = function() {
                    ctrl.object.save();
                };
            },
            controllerAs: 'rowController',
            bindToController: true,
            link: function(scope, element, attributes, controllers) {
                var rowController = controllers[0];
                var tableController = controllers[1];
                rowController.validate();
                element.on('click', function(event) {
                    scope.$apply(function() {
                        if (tableController.selectionMode == 'single') {
                            element.addClass('active');
                            /* TODO : deselect other lines */
                        } else {
                            /* TODO : implement me ! */
                        }
                    });
                });
            }
        }
    }

    mrpStatus.$inject = [];
    function mrpStatus() {
        return {
            restrict: 'C',
            require: '^^tr',
            scope: {
                object: '='
            },
            template: '<i class="fa fa-circle" ng-class="{' +
                "'text-success': object.status == 'valid'," +
                "'text-warning': object.status == 'warning'," +
                "'text-danger': object.status == 'error'," +
                "'text-muted': object.status == undefined" +
            '}"> </i>',
            link: function(scope, element, attributes, rowController) {
                element.css('verticalAlign', 'middle');
                element.css('width', '1px');
                if (angular.isUndefined(scope.object) && (rowController.object != null)) {
                    scope.object = rowController.object;
                }
            }
        };
    }

    mrpCellEditor.$inject = ['$timeout'];
    function mrpCellEditor($timeout) {
        return {
            restrict: 'C',
            require: ['cellEditor', '^^tr'],
            scope: {
                object: '=',
                property: '@'
            },
            controller: ['$scope', function($scope) {
                var ctrl = this;
                ctrl.editing = false;
                ctrl.edit = function() {
                    var width = ctrl.td[0].getBoundingClientRect().width;
                    ctrl.td.css('width', width + 'px');
                    $scope.tmp = $scope.object[$scope.property];
                    ctrl.editing = true;
                    $timeout(function() {
                        ctrl.input.focus();
                        ctrl.input.select();
                    })
                };
                ctrl.blur = function() {
                    ctrl.commit();
                };
                ctrl.keyup = function($event) {
                    if ($event.keyCode == 13) {
                        ctrl.commit();
                    } else if ($event.keyCode == 27) {
                        ctrl.cancelEdit();
                    }
                };
                ctrl.commit = function() {
                    if (!ctrl.editing) return;
                    $scope.object[$scope.property] = $scope.tmp;
                    ctrl.editing = false;
                    ctrl.rowController.validate().then(ctrl.rowController.save());
                };
                ctrl.cancelEdit = function() {
                    ctrl.editing = false;
                }
            }],
            controllerAs: 'ctrl',
            template: '<input data-ng-blur="ctrl.blur()" data-ng-keydown="ctrl.keyup($event)" data-ng-keypress="ctrl.keypress($event)" data-ng-show="ctrl.editing" type="text" style="width: 100%;" data-ng-model="tmp"><div data-ng-dblclick="ctrl.edit()" data-ng-show="!ctrl.editing" style="border: 1px solid transparent; padding: 2px;">{{object[property] || \'&nbsp;\' }}</div>',
            link: function(scope, element, attributes, controllers) {
                var editorController = controllers[0];
                var rowController = controllers[1];
                if (angular.isUndefined(scope.object)) {
                    scope.object = rowController.object;
                }
                editorController.td = element;
                editorController.input = angular.element('input', element);
                editorController.rowController = rowController;
            }
        };
    }

    readOnly.$inject = [];
    function readOnly() {
        return {
            restrict: 'C',
            require: '^^tr',
            scope: {
                object: '=',
                property: '@'
            },
            template: '<div style="border: 1px solid transparent; padding: 2px;">{{object[property]}}</div>',
            link: function(scope, element, attributes, controller) {
                if (angular.isUndefined(scope.object)) {
                    scope.object = controller.object;
                }
            }
        };
    }

    angular
        .module('mrp.tables', ['validation'])
    ;

    angular
        .module('mrp.tables')
        .directive('mrpStatus', mrpStatus)
        .directive('table', mrpTable)
        .directive('tr', mrpTableRow)
        .directive('cellEditor', mrpCellEditor)
        .directive('readOnly', readOnly)
    ;

})(window.angular);

