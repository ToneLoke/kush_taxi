(function() {
  angular.module( 'controllers', [] )
  .controller( 'signUp', signUp )
  .controller( 'patients', patients )
  function patients(){
    var patient = this
    patient.orders = [
      { id: 1, date: "12/25/2015", total: 500, items: [
        { name: "green krack", price: 60, qty: 1 },
        { name: "purple haze", price: 120, qty: 2 },
        { name: "space queen", price: 110, qty: 2 } ] },
      { id: 2, date: "12/25/2015", total: 500, items: [
        { name: "green krack", price: 60, qty: 1 },
        { name: "purple haze", price: 120, qty: 2 },
        { name: "space queen", price: 110, qty: 2 } ] }
    ]
}
  function signUp($http){
    var signUp = this
    signUp.submit = function(){
      console.log("======== adding new patient ============")
      $http.post('http://10.200.8.177:3000/api/patients', signUp.patient)
        .then( function(res){
            console.log(res)
        })
    }
  }
}());