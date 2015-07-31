(function(angular) {

    loginController.$inject = ['$scope', 'authService', '$window'];
    function loginController($scope, authService, $window) {
        var ctrl = this;
        ctrl.processing = false;
        ctrl.error = false;
        ctrl.login = function() {
            ctrl.processing = true;
            authService.authenticate(ctrl.username, ctrl.password).then(function success() {
                console.log('Login successfull');
                $window.location = "..";
            }, function failure() {
                console.log('Login failed');
                ctrl.error = true;
                ctrl.processing = false;
                angular.element('[autofocus]').focus();
                angular.element('[autofocus]').select();
            });
        };

        $scope.$watch(function() { return ctrl.username  + ctrl.password }, function() {
            ctrl.error = false;
        });
    }

    config.$inject = ['localStorageServiceProvider'];
    function config(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('mrp');
    }

    run.$inject = ['localStorageService', 'tokenStorageKey', 'userDataStorageKey'];
    function run(localStorageService, tokenStorageKey, userDataStorageKey) {
        localStorageService.remove(tokenStorageKey);
        localStorageService.remove(userDataStorageKey);
    }

    angular
        .module('mrp.login', ['mrp.auth', 'LocalStorageModule'])
    ;

    angular
        .module('mrp.login')
        .controller('LoginController', loginController)
        .config(config)
        .run(run)
    ;

})(window.angular);