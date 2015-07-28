(function(angular, jQuery) {

    angular
        .module('backstretch', [])
    ;

    angular
        .module('backstretch')
        .directive('bodyBackstretch', ['$timeout', function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    $timeout(function() {
                        $('body').backstretch(attr.bodyBackstretch);
                    });

                }
            }
        }])
    ;

})(window.angular, window.jQuery);