(function () {
angular.module('appRoutes', ['ui.router', 'controllers'])
    .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/')

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/partials/home.html',
          controller: 'patients as p'
        })
        // SIGNUP STATES ========================================
        .state('signUp', {
          url: '/signup',
          templateUrl: 'partials/signUp.html',
          controller: 'signUp as su'
        })

        // LOGIN PAGE STATES =================================
        .state('logIn', {
          url: '/login',
          templateUrl: 'partials/logIn.html',
          controller: 'logIn as ln'
        })

        // CART STATES ==========================
        .state('cart', {
          url: '/cart',
          templateUrl: '/partials/cart.html',
          controller: 'orders as or'
        })

        // PRODUCT STATES =======================
        .state('products', {
          url: '/products',
          templateUrl: '/partials/products.html',
          controller: 'products as pr'
        })

        // CONTACT STATES ======================
        .state('contact', {
          url: '/contact',
          templateUrl: '/partials/contact.html'
        // controllerAs: 'contact as co'
        })

        // USERS STATES =================
        .state('patients', {
          url: '/patients',
          templateUrl: 'partials/patients.html',
          controller: 'patients as p'
        })
    })
}())
