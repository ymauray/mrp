(function(angular) {

    appController.$inject = ['localStorageService'];
    function appController(localStorageService) {
        this.title = "Titre de la page";
        console.log("Local storage supported : " + localStorageService.isSupported);
        console.log("Local storage type : " + localStorageService.getStorageType());
    }

    config.$inject = ['localStorageServiceProvider'];
    function config(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('mrp');
    }

    angular
        .module('mrp', ['mrp.auth', 'mrp.login', 'mrp.routes', 'LocalStorageModule', 'backstretch'])
    ;

    angular
        .module('mrp')
        .config(config)
        .controller('AppController', appController)
    ;

})(window.angular);