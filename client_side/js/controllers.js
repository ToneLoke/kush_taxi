;(function () {
  angular.module('controllers', [])
  .controller('patients', patients)
  .controller('signUp', signUp)
  .controller('logIn', logIn)
  .controller('products', products)
  // ======================================
  // depencies injection
  // ======================================
  signUp.$inject = ['fileUpload']
  // ======================================
  // Products controller
  // ======================================
  function products (leafly, strainFactory) {
    console.log('productsController+++++++++++++++')
    var ctrlP = this
    ctrlP.strains = []
    strainFactory.allStrains()
    .then(function (strains) {
      console.log('strains from db:', strains)
      ctrlP.strains = strains.data
    })
    // leafly.allStrains()
    //   .then(function (response) {
    //     console.log('From Leafly=========', response.data.Strains)
    //     ctrlP.strains = response.data.Strains
    //     ctrlP.strains.forEach(function (strain, index) {
    //       console.log("Strain==========", strain)
    //       leafly.strainPhotos(strain.UrlName)
    //       .then(function(resp){
    //         strain.photos = resp.photos
    //         strainFactory.createStrain(strain)
    //         .then(function (res) {
    //           console.log(res)
    //         })
    //       })
    //     })
    //   }, function (response) {
    //     console.log(response)
    //   })
  }
  // ======================================
  // Patients controller
  // ======================================
  function patients (Auth) {
    var patient = this
    patient.orders = []
    // get info if a person is logged in
    patient.loggedIn = Auth.isLoggedIn()
    // check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function() {
      patient.loggedIn = Auth.isLoggedIn()

      // get user information on page load
      Auth.getUser()
      .then(function(data) {
        patient.user = data.data;
      })
    })

    // function to handle logging out
    patient.doLogout = function() {
      Auth.logout()
      patient.user = ''

      $location.path('/home')
    }
  }
  // ======================================
  // Sign up controller
  // ======================================
  function signUp (fileUpload) {
    var signUp = this
    signUp.pics = []
    signUp.submit = function () {
      console.log('======== adding new patient ============')
      signUp.pics.push(signUp.patient.recImg)
      signUp.pics.push(signUp.patient.idImg)
      console.log('=====patient===', signUp.patient)
      fileUpload.uploadFileToUrl(signUp.pics, signUp.patient, 'http://localhost:3000/api/patients')
    }
  }
  // ======================================
  // Log In controller
  // ======================================
  function logIn ($rootScope, $location, Auth) {
    var logIn = this
    logIn.submit = function () {
      logIn.processing = true
      logIn.error = ''
      console.log('===== log in attempt ========')
      Auth.login(logIn.email,logIn.password)
      .then(function (data) {
        logIn.processing = false
        console.log(data)
        if(data.success)
        $location.path('/products')
        else {
          logIn.error = data.message
        }
      })
    }
  }
}())
