var app = angular.
    module('stevenshopApp', [
        'firebase',
        'ui.router'
    ]).
    config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.
            state('home', {
                url: '/',
                templateUrl: 'views/main.html',
                controllerUrl: 'controllers/main.js'
            }).
            state('login', {
                url: '/login',
                templateUrl: 'views/login.html'
            }).
            state('admin', {
                abstract: true,
                url: '/admin',
                templateUrl: 'views/admin.html',
                controllerUrl: 'controllers/adminCtrl.js'
            }).
            state('admin.jobs', {
                url: '/jobs',
                templateUrl: 'views/admin/jobs.html'
            }).
            state('admin.pages', {
                url: '/pages',
                templateUrl: 'views/admin/pages.html'
            });
        });
