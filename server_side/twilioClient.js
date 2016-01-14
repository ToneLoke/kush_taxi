var
  config = require('./config'),
  client = require('twilio')(config.accountSid, config.authToken)

module.exports.sendSms = function (to, message) {
  console.log('======SENDING SMS TO====', to)
  client.messages.create({
    body: message,
    to: to,
    from: config.sendingNumber
  //  mediaUrl: imageUrl
  }, function (err, data) {
    if (err) {
      console.error('Could not notify administrator')
      console.error(err)
    } else {
      console.log('Administrator notified')
    }
  })
}
