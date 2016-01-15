(function () {
  angular.module('kushFactory', [])
    .factory('leafly', leaflyApi)
  leaflyApi.$inject = ['$http']

  function leaflyApi ($http) {
    var leaflyData = {}

    leaflyData.allStrains = function () {
      $http({
        method: 'GET',
        url: 'http://data.leafly.com/strains',
        data: {'Page': 0, 'Take': 10},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Login-Ajax-call': 'true',
          'app_key': 'd438ce1df22b6dfa36c8a4d73221fa55',
          'app_id': '2feac533'
        }
      })
        .then(function (response) {
          console.log(response)
        }, function (response) {
          console.log(response)
        })
    }
  }
}())

// curl -v -H "app_id:2feac533" -H "app_key:d438ce1df22b6dfa36c8a4d73221fa55" -X POST "http://data.leafly.com/strains" -d '{"Page":0,"Take":10}'
