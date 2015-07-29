(function(angular) {

    loginController.$inject = ['$scope', 'lodash', 'authService', '$state'];
    function loginController($scope, lodash, authService, $state) {
        var ctrl = this;
        ctrl.processing = false;
        ctrl.error = false;
        ctrl.login = function() {
            ctrl.processing = true;
            authService.authenticate(ctrl.username, ctrl.password).then(function success() {
                console.log('Login successfull');
                $state.go('home');
            }, function failure() {
                console.log('Login failed');
                ctrl.error = true;
                ctrl.processing = false;
                angular.element('[autofocus]').focus();
                angular.element('[autofocus]').select();
            });
        }
        $scope.$watch(function() { return ctrl.username  + ctrl.password }, function() {
            ctrl.error = false;
        });
    }

    onEnter.$inject = ['localStorageService', 'tokenStorageKey', 'userDataStorageKey'];
    function onEnter(localStorageService, tokenStorageKey, userDataStorageKey) {
        localStorageService.remove(tokenStorageKey);
        localStorageService.remove(userDataStorageKey);
    }

    onExit.$inject = [];
    function onExit() {
        angular.element('.backstretch').remove();
    }

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: loginController,
                controllerAs: 'loginController',
                onEnter: onEnter,
                onExit: onExit
            })
        ;
    }

    angular
        .module('mrp.login', ['ui.router', 'lodash', 'mrp.auth', 'LocalStorageModule'])
    ;

    angular
        .module('mrp.login')
        .config(config)
    ;

})(window.angular);