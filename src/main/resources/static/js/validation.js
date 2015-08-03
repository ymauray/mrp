'use strict';

(function(angular) {

    function ValidationSupport() {

        var support = this;

        support.warnings = [];
        support.errors = [];

        return {
            addError: function(message) {
                support.errors.push(message);
            },
            addWarning: function(message) {
                support.warnings.push(message);
            },
            getValidationResult: function() {
                var result = {
                    status: 'valid',
                    errors: support.errors,
                    warnings: support.warnings
                };
                if (support.errors.length > 0) {
                    result.status = 'error';
                } else if (support.warnings.length > 0) {
                    result.status = 'warning';
                }

                return result;
            }
        }
    }

    validationFactory.$inject = [];
    function validationFactory() {

        function getValidationSupport() {
            return new ValidationSupport();
        }

        return {
            getValidationSupport: getValidationSupport
        }
    }

    angular
        .module('validation', [])
    ;

    angular
        .module('validation')
        .factory('validation', validationFactory)
    ;

})(window.angular);