;(function () {
  angular.module('kushFactory', [])
    // Create the factories to export
    .factory('leafly', leaflyApi)
    .factory('strainFactory', strainFactory)
    .factory('Auth', Auth)
    .factory('AuthToken', AuthToken)
    .factory('AuthInterceptor', AuthInterceptor)
  // inject the depencies to use for each factory
  leaflyApi.$inject = ['$http']
  strainFactory.$inject = ['$http']
  Auth.$inject = ['$http', '$q', 'AuthToken']
  AuthToken.$inject = ['$window']
  AuthInterceptor.$inject = ['$q', '$location', 'AuthToken']
  // ========================================
  // Strain Factory
  // ========================================
  function strainFactory ($http) {
    var strainData = {}

    strainData.createStrain = function (strain) {
      console.log('strainFactory', strain)
      return $http.post('http://192.168.1.153:3000/api/products', strain)
    }
    strainData.allStrains = function (strain) {
      console.log('getting all strains')
      return $http.get('http://192.168.1.153:3000/api/products')
    }
    return strainData
  }
  // ===================================
  // Leafly API Calls
  // ===================================
  function leaflyApi ($http) {
    var leaflyData = {}

    leaflyData.allStrains = function () {
      return $http({
        method: 'POST',
        url: 'http://data.leafly.com/strains',
        data: {Page: 7, Take: 50},
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'app_key': 'd438ce1df22b6dfa36c8a4d73221fa55',
          'app_id': '2feac533'
        }
      })
    }
    leaflyData.strainPhotos = function (strainName) {
      return $http({
        method: 'GET',
        url: 'http://data.leafly.com/strains/' + strainName + '/photos?page=0&take=20',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'app_key': 'd438ce1df22b6dfa36c8a4d73221fa55',
          'app_id': '2feac533'
        }
      })
    }
    return leaflyData
  }
  // ===================================
  // Authentication Factory's
  // ===================================
  function Auth ($http, $q, AuthToken) {
    // Empty object to return
    var authFactory = {}
    // Log in a user
    authFactory.login = function (email, password) {
      return $http.post('http://localhost:3000/api/authenticate', {email: email, password: password})
        .then(function (data) {
          AuthToken.setToken(data.token)
          return data
        })
    }

    // log a user out by clearing the token
    authFactory.logout = function () {
      // clear the token
      AuthToken.setToken()
    }
    // check if a user is logged in via tokens
    authFactory.isLoggedIn = function () {
      if (AuthToken.getToken())
        return true
      else
        return false
    }
    // get the logged in user
    authFactory.getUser = function () {
      if (AuthToken.getToken())
        return $http.get('/api/me', { cache: true })
      else
        return $q.reject({ message: 'User has no token.' })
    }

    // return auth factory object
    return authFactory

  }

  // ===================================================
  // factory for handling tokens
  // inject $window to store token client-side
  // ===================================================
  function AuthToken ($window) {
    var authTokenFactory = {}

    // get the token out of local storage
    authTokenFactory.getToken = function () {
      return $window.localStorage.getItem('token')
    }

    // function to set token or clear token
    // if a token is passed, set the token
    // if there is no token, clear it from local storage
    authTokenFactory.setToken = function (token) {
      if (token)
        $window.localStorage.setItem('token', token)
      else
        $window.localStorage.removeItem('token')
    }

    return authTokenFactory

  }

  // ===================================================
  // application configuration to integrate token into requests
  // ===================================================
  function AuthInterceptor ($q, $location, AuthToken) {
    var interceptorFactory = {}

    // this will happen on all HTTP requests
    interceptorFactory.request = function (config) {
      // grab the token
      var token = AuthToken.getToken()

      // if the token exists, add it to the header as x-access-token
      if (token)
        config.headers['x-access-token'] = token

      return config
    }

    // happens on response errors
    interceptorFactory.responseError = function (response) {
      // if our server returns a 403 forbidden response
      if (response.status == 403) {
        AuthToken.setToken()
        $location.path('/login')
      }

      // return the errors from the server as a promise
      return $q.reject(response)
    }

    return interceptorFactory
  }
}())
