var
  db = require('./models.js'),
  fs = require('fs')

module.exports = {

  patient: {
    create: function(req, res){
      if(req.body)
      {
        console.log(req.body, req.files)
        var patient = new db.Patient()
        patient.fname = req.body.fname
        patient.email = req.body.email
        patient.password = req.body.password
        patient.recImg.data = fs.readFileSync(req.body.recImg)
        patient.save(function(err){
          if(err) res.json({error: err.message, success: false})
          res.json({message: 'Patient Added!', success: true})
        })
      }
    }
  }

}
