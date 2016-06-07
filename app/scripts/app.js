var app = angular.
    module('stevenshopApp', [
        'firebase',
        'ui.router'
    ]).
    config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/cabinetry');
            $stateProvider.
            state('home', {
                url: '/cabinetry',
                templateUrl: 'views/main.html',
                controllerUrl: 'controllers/main.js'
            }).
            state('construction', {
                url: '/construction',
                templateUrl: 'views/main.html',
                controllerUrl: 'controllers/main.js'
            }).
            state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controllerUrl: 'controllers/main.js'
            }).
            state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controllerUrl: 'controllers/adminCtrl.js'
            }).
            state('admin', {
                abstract: true,
                url: '/admin',
                templateUrl: 'views/admin.html',
                controllerUrl: 'controllers/adminCtrl.js'
            }).
            state('admin.jobs', {
                url: '/jobs',
                templateUrl: 'views/admin/jobs.html',
                controllerUrl: 'controllers/jobsCtrl.js'
            }).
            state('admin.pages', {
                url: '/pages',
                templateUrl: 'views/admin/pages.html',
                controllerUrl: 'controllers/pagesCtrl.js'
            });
        });
