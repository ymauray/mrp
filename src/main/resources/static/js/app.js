(function(angular) {

    appController.$inject = ['localStorageService', '$rootScope', 'lodash'];
    function appController(localStorageService, $rootScope, _) {
        var ctrl = this;

        ctrl.title = "Titre de la page";

        $rootScope.$on('$stateChangeSuccess', function(element, toState, toStateParam) {
            if (!_.isUndefined(toState) && !_.isUndefined(toState.data)) {
                ctrl.stateData = _.pick(toState.data, ['pageHeader', 'pageDescription']);
            } else {
                delete ctrl.stateData;
            }
        });
    }

    config.$inject = ['localStorageServiceProvider'];
    function config(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('mrp');
    }

    angular
        .module('mrp', ['mrp.auth', 'mrp.routes', 'mrp.users', 'adminlte', 'LocalStorageModule', 'backstretch', 'lodash', 'restangular'])
    ;

    angular
        .module('mrp')
        .config(config)
        .controller('AppController', appController)
    ;

})(window.angular);