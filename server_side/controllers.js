var
  db = require('./models.js'),
  fs = require('fs')

module.exports = {

  patient: {
    create: function(req, res){
      if(req.body)
      {
        var patient = new db.Patient(req.body)
        patient.save(function(err){
          if(err) res.json({error: err.message, success: false})
          res.json({message: 'Patient Added!', success: true})
        })
      }
    }
  }

}
