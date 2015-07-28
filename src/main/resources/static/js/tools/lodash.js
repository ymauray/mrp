(function(angular, lodash) {

    function lodashFactory() {
        return lodash;
    }

    angular
        .module('lodash', [])
    ;

    angular
        .module('lodash')
        .factory('lodash', lodashFactory)
    ;

    angular
        .module('ngLodash', ['lodash'])
    ;

})(window.angular, window._);