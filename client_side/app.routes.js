(function() {
  angular.module( 'appRoutes', ['ui.router'] )
    .config( function ( $stateProvider, $urlRouterProvider ) {

      $urlRouterProvider.otherwise('/')

      $stateProvider

      // SIGNUP STATES ========================================
        .state('signUp', {
        url: '/signup',
        templateUrl: 'partials/signUp.html',
        controllerAs: 'signUp as su'
      })

      // LOGIN PAGE STATES =================================
        .state('logIn', {
        url: '/login',
        templateUrl: 'partials/logIn.html',
        controllerAs: "logIn as ln"
      })

      // CART STATES ==========================
        .state('cart', {
        url: '/cart',
        templateUrl: '/partials/cart.html',
        // controllerAs: 'cart as ct'
      })

      // PRODUCT STATES =======================
        .state('products', {
        url: '/products',
        templateUrl: '/partials/products_template.html',
        // controllerAs: 'products as pr'
      })

      // ORDERS STATES ======================
        .state('orders', {
        url: '/orders',
        templateUrl: '/partials/orders.html',
        controllerAs: 'patients as ps'
      })

      // CONTACT STATES ======================

        .state('contact', {
        url: '/contact',
        templateUrl: '/partials/contact.html',
        // controllerAs: 'contact as co'
      })

      // LOCATIONS STATES ======================

        .state('locations', {
        url: '/locations',
        templateUrl: '/partials/locations.html',
        // controllerAs: 'locations as lc'
      })


    });
}());
