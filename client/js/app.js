var app = angular.module('mycoffeeApp', ['ngRoute','ngResource','ngProgress','Ctrlmodule'])
.config(['$routeProvider','$controllerProvider', function ($routeProvider, $controllerProvider) {
        app.controller = $controllerProvider.register;
        $routeProvider
                .when('/:name', {
                    templateUrl: function (urlattr) {
                        return 'views/partials/' + urlattr.name + ".html";
                    }
                })
                .when('/:name/:arg1', {
                    templateUrl: function (urlattr) {

                        return 'views/partials/' + urlattr.name + ".html";
                    }
                })
                .when('/:name/:arg1/:arg2', {
                    templateUrl: function (urlattr) {
                        return 'views/partials/' + urlattr.name + ".html";
                    }
                })
                .when('/:name/:arg1/:arg2/:arg3', {
                    templateUrl: function (urlattr) {
                        return 'views/partials/' + urlattr.name + ".html";
                    }
                })
                .when('/:name/:arg1/:arg2/:arg3/:arg4', {
                    templateUrl: function (urlattr) {
                        return 'views/partials/' + urlattr.name + ".html";
                    }
                })
                .when('/:name/:arg1/:arg2/:arg3/:arg4/:arg5', {
                    templateUrl: function (urlattr) {
                        return 'views/partials/' + urlattr.name + ".html";
                    }
                })
                .when('/:name/:arg1/:arg2/:arg3/:arg4/:arg5/:arg6', {
                    templateUrl: function (urlattr) {
                        return 'views/partials/' + urlattr.name + ".html";
                    }
                })
                .when('/', {
                    templateUrl: '/views/partials/root.html'
                })
                .otherwise({redirectTo: '/'});
        ;
    }])
    .run(['$rootScope', '$location','ngProgressFactory',function ($rootScope, $location,ngProgressFactory) {
      $rootScope.progressbar = ngProgressFactory.createInstance();
      $rootScope.progressbar.setHeight('4');
      $rootScope.progressbar.setColor('red');
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
          $rootScope.progressbar.start();
            if (current && next && next.params) {
                next.$$route.controller = next.params.name;
                $rootScope.progressbar.complete();
            }
        });
    }]);
