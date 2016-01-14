var db = require('./models'),
  fs = require('fs')

module.exports = {
  // ==========================================
  // Order Controller Object
  // ==========================================
  order: {
    // All order data
    all: function (req, res) {
      console.log('===========All Order Data Request++++++++++++++++')
      db.Order.find({}, function (err, orders) {
        if (err) res.json({error: err, message: 'Error', success: false})
        res.json(orders)
      })
    }, // End of all method
    create: function (req, res) {
      console.log('=====Creating new order request+++++++')
      var order = db.Order.new(req.body.order)
      order.save(function (err) {
        if (err) res.json({
            message: err.message,
            success: false
          })
        res.json({
          message: 'Order Created!',
          success: true
        })
      })
    }
  }, // End of Order Object
  // ==========================================
  // Patient Controller Object
  // ==========================================
  patient: {
    // All patient data
    all: function (req, res) {
      console.log('=======All Patient Data Request+++++++++++')
      db.Patient.find({}, function (err, patients) {
        if (err) res.json({error: err, message: 'Error', success: false})
        res.json(patients)
      })
    }, // ENd of all patient data
    // Single Patient Data
    data: function (req, res) {
      console.log('========Single patient data request==========')
      db.Patient.findById(req.param('_id'), function (err, patient) {
        if (err) res.json({error: err, message: 'Error', success: false})
        res.json(patient)
      })
    }, // get patient data
    // create a new patient profile
    create: function (req, res) {
      console.log('===files===', req.files)
      if (req.body.patient) {
        var tmp_path = req.files.file.path
        var target_path = './uploads/' + req.files.file.name
        fs.rename(tmp_path, target_path, function (err) {
          if (err) throw err
          // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
          fs.unlink(tmp_path, function () {
            if (err) throw err
          // res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes')
          })
        })

        console.log('===patient===', JSON.parse(req.body.patient))
        var patient = new db.Patient(JSON.parse(req.body.patient))
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
    }, // End of create method
    signIn: function (req, res) {
      patient.findOne({
        email: req.body.email
      }, function (err, patient) {
        if (err) res.json({
            err: err
          })
        if (patient) {
          if (patient.authenticate(req.body.password)) {
            var token = jwt.sign({
              name: patient.fname,
              email: patient.email
            },
              secret, {
                expiresInMinutes: 52000
              })

            res.json({
              token: token,
              message: 'valid patient'
            })
          } else
            res.json({
              message: 'invalid patient'
            })
        } else
          res.json({
            message: 'patient not found'
          })
      })
    } // End of Sign In Method
  }
  // ==========================================
  // End of Patient Controller Object
  // ==========================================

}
