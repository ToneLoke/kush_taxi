;(function () {
  angular.module('controllers', [])
    .controller('patients', patients)
    .controller('signUp', signUp)
    .controller('logIn', logIn)
    .controller('productsController', productsController)

  signUp.$inject = ['$http', 'fileUpload']

  function productsController ($http) {
    console.log('productsController+++++++++++++++')
    var ctrlP = this
    ctrlP.strains = []
    $http({
      method: 'POST',
      url: 'http://data.leafly.com/strains',
      data: {Page: 0, Take: 10},
      headers: {
        'Content-Type': 'application/json',
        'app_key': 'd438ce1df22b6dfa36c8a4d73221fa55',
        'app_id': '2feac533'
      }
    })
      .then(function (response) {
        console.log('From Leafly=========', response.data.Strains)
        ctrlP.strains = response.data.Strains
      }, function (response) {
        console.log(response)
      })
  }
  function patients () {
    var patient = this
    patient.orders = [{
      id: 1,
      date: '12/25/2015',
      total: 500,
      items: [{
        name: 'green krack',
        price: 60,
        qty: 1
      }, {
        name: 'purple haze',
        price: 120,
        qty: 2
      }, {
        name: 'space queen',
        price: 110,
        qty: 2
      }]
    }, {
      id: 2,
      date: '12/25/2015',
      total: 500,
      items: [{
        name: 'green krack',
        price: 60,
        qty: 1
      }, {
        name: 'purple haze',
        price: 120,
        qty: 2
      }, {
        name: 'space queen',
        price: 110,
        qty: 2
      }]
    }]
  }

  function signUp ($http, fileUpload) {
    var signUp = this
    signUp.pics = []
    signUp.submit = function () {
      console.log('======== adding new patient ============')
      // $http.post('http://10.200.8.177:3000/api/patients', signUp.patient)
      //   .then( function(res){
      //       console.log(res)
      //   })
      signUp.pics.push(signUp.patient.recImg)
      signUp.pics.push(signUp.patient.idImg)
      console.log('=====patient===', signUp.patient)
      fileUpload.uploadFileToUrl(signUp.pics, signUp.patient, 'http://localhost:3000/api/patients')
    }
  }

  function logIn ($http) {
    var logIn = this
    logIn.submit = function () {
      console.log('===== log in successful ========')
      $http.get('http://10.200.8.177:3000/api/patients', logIn.patient)
        .then(function (res) {
          console.log(res)
        })
    }
  }
}())
