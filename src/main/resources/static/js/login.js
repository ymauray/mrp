(function(angular) {

    function loginController() {
        this.processing = false;
        this.login = function() {
            this.processing = true;
            console.log('login with username = ' + this.username + ' and password = ' + this.password);
        }
    }

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: loginController,
                controllerAs: 'loginController'
            })
        ;
    }

    angular
        .module('mrp.login', ['ui.router'])
    ;

    angular
        .module('mrp.login')
        .config(config)
    ;

})(window.angular);