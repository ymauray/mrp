'use strict';

(function(angular) {

    mrpStatus.$inject = [];
    function mrpStatus() {
        return {
            restrict: 'C',
            scope: {
                object: '='
            },
            replace: true,
            template: '<i class="fa fa-circle" ng-class="{' +
                "'text-success': object.status == 'valid'," +
                "'text-warning': object.status == 'warning'," +
                "'text-danger': object.status == 'error'," +
                "'text-muted': object.status == undefined" +
            '}"> </i>'
        };
    }

    mrpCell.$inject = ['$timeout'];
    function mrpCell($timeout) {
        return {
            restrict: 'C',
            scope: {
                object: '=',
                property: '@'
            },
            controller: function() {
                var ctrl = this;
                ctrl.editing = false;
                ctrl.edit = function() {
                    var width = ctrl.td[0].getBoundingClientRect().width;
                    ctrl.td.css('width', width + 'px');
                    ctrl.editing = true;
                    $timeout(function() {
                        ctrl.input.focus();
                        ctrl.input.select();
                    })
                };
                ctrl.blur = function() {
                    //ctrl.editing = false;
                };
            },
            controllerAs: 'ctrl',
            template: '<input ng-blur="ctrl.blur()" ng-show="ctrl.editing" type="text" style="width: 100%;" value="{{object[property]}}" ng-model="object[property]"><div ng-dblclick="ctrl.edit()" ng-show="!ctrl.editing">{{object[property]}}</div>',
            compile: function() {
                return function(scope, element, attributes, ctrl) {
                    ctrl.td = element;
                    ctrl.input = angular.element('input', element)[0];
                }
            }
        };
    }

    angular
        .module('mrp.tables', [])
    ;

    angular
        .module('mrp.tables')
        .directive('mrpStatus', mrpStatus)
        .directive('mrpCell', mrpCell)
    ;

})(window.angular);

