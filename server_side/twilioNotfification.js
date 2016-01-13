var twilioClient = require('./twilioClient')
var fs = require('fs')
var db = require('./models')

function newPatientAlert (patient) {
  return 'You have a new member! Name: ' + patient.fname +' '+ patient.lname + 'Verify them here:' +
   patient.recUrl
}

exports.notifyOnSignUp = function () {

    var messageToSend = formatMessage(appError.message)
    twilioClient.sendSms(admin.phoneNumber, messageToSend)
  })
  next(appError)
}
