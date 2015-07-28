(function(angular) {

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/home')
        ;
        $stateProvider
            .state('secured', {
                abstract: true,
                data: {
                    secured: true
                }
            })
            .state('home', {
                parent: 'secured',
                url: '/home',
                template: '<p>Home page</p>'
            })
        ;
    }

    angular
        .module('mrp.routes', ['ui.router'])
    ;

    angular
        .module('mrp.routes')
        .config(config)
    ;

})(window.angular);