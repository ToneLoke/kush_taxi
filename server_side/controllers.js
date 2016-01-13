var db = require('./models.js'),
  fs = require('fs')

module.exports = {
  // CREATE A PATIENT
  patient: {
    // create a new patient profile
    create: function (req, res) {
      console.log('===patient===', req.body.patient)
      console.log('===files===', req.files)
      if (req.body) {
        var tmp_path = req.files.file.path
        var target_path = '/Users/David/Desktop/WORKSPACE/kush_taxi/server_side/uploads/' + req.files.file.name
        fs.rename(tmp_path, target_path, function (err) {
          if (err) throw err
          // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
          fs.unlink(tmp_path, function () {
            if (err) throw err
          // res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes')
          })
        })

        var patient = new db.Patient(req.body)
        patient.recImg.data = fs.readFileSync(target_path)
        patient.recImg.contentType = req.files.file.type
        patient.save(function (err) {
          if (err) res.json({
              message: err.message,
              success: false
            })
          res.json({
            message: 'Patient Added!',
            success: true
          })
        })
      }
    },// End of create method
    signIn: function (req, res) {
      User.findOne({
        email: req.body.email
      }, function (err, user) {
        if (err) res.json({
            err: err
          })
        if (user) {
          if (user.authenticate(req.body.password)) {
            var token = jwt.sign({
              name: user.name,
              email: user.email
            },
              secret, {
                expiresInMinutes: 1440
              })

            res.json({
              token: token,
              message: 'valid user'
            })
          } else
            res.json({
              message: 'invalid user'
            })
        } else
          res.json({
            message: 'user not found'
          })
      })
    }//End of Sign In Method
  } // End of Patient Controller Object

}
