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
        controllerAs: "logIn as li"
      })

      // CART STATES ==========================
        .state('cart', {
        url: '/cart',
        templateUrl: '/partials/cart.html',
        controllerAs: 'cart as ct'
      })

      // PRODUCT STATES =======================
        .state('products', {
        url: '/products',
        templateUrl: '/partials/products.html',
        controllerAs: 'products as ps'
      })

      // ORDERS STATES ======================
        .state('orders', {
        url: '/orders',
        templateUrl: '/partials/orders.html',
        controllerAs: 'orders as os'
      })



    });
}());
