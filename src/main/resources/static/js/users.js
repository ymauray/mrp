(function(angular) {

    userServiceFactory.$inject = [];
    function userServiceFactory() {
        return {
        };
    }

    angular
        .module('mrp.users', [])
    ;

    angular
        .module('mrp.users')
        .factory('userService', userServiceFactory)
    ;

})(window.angular);