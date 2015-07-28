(function(angular) {

    loginController.$inject = ['lodash', 'authService', '$state'];
    function loginController(lodash, authService, $state) {
        this.processing = false;
        this.login = function() {
            this.processing = true;
            console.log('login with username = ' + this.username + ' and password = ' + this.password);
            authService.authenticate(this.username, this.password).then(function success() {
                console.log('Login successfull');
                $state.go('home');
            }, function failure() {
                console.log('Login failed');
            });
        }
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