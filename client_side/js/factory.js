;(function () {
  angular.module('kushFactory', [])
    .factory('leafly', leaflyApi)
    .factory('strainFactory', strainFactory)
  leaflyApi.$inject = ['$http']
  strainFactory.$inject = ['$http']
  function strainFactory ($http) {
    var strainData = {}

    strainData.createStrain = function (strain) {
      return $http.post('localhost:3000/api/', strain)
    }
    return strainData
  }
  function leaflyApi ($http) {
    var leaflyData = {}

    leaflyData.allStrains = function () {
      return $http({
        method: 'POST',
        url: 'http://data.leafly.com/strains',
        data: {Page: 0, Take: 10},
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'app_key': 'd438ce1df22b6dfa36c8a4d73221fa55',
          'app_id': '2feac533'
        }
      })
    }
    return leaflyData
  }
}())

// curl -v -H "app_id:2feac533" -H "app_key:d438ce1df22b6dfa36c8a4d73221fa55" -X POST "http://data.leafly.com/strains" -d '{"Page":0,"Take":10}'
