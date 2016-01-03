var
  db = require('./models.js'),
  fs = require('fs')

module.exports = {
  // CREATE A PATIENT
  patient: {
    create: function(req, res) {
      console.log("===patient===",req.body.patient)
      console.log("===files===",req.files)
      // if (req.body) {
      //   var tmp_path = req.files.file.path
      //   var target_path = '/Users/Tony/Documents/Workspace/kush_taxi/server_side/uploads/' + req.files.file.name
      //   fs.rename(tmp_path, target_path, function(err) {
      //     if (err) throw err
      //       // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
      //     fs.unlink(tmp_path, function() {
      //       if (err) throw err
      //       res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes')
      //     })
      //   })
      //
      //   var patient = new db.Patient()
      //   patient.fname = req.body.fname
      //   patient.lname = req.body.fname
      //   patient.email = req.body.email
      //   patient.password = req.body.password
      //   patient.recImg.data = fs.readFileSync(target_path)
      //   patient.save(function(err) {
      //     if (err) res.json({
      //       error: err.message,
      //       success: false
      //     })
      //     res.json({
      //       message: 'Patient Added!',
      //       success: true
      //     })
      //   })
      // }
    }
  }

}
