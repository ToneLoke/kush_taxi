var bcrypt = require('bcrypt'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  twilioClient = require('./twilioClient'),

  // =====Item Model===== //
  itemSchema = new Schema({
    UrlName: String,
    Name: String,
    Category: String,
    Symbol: String,
    RatingCount: Number,
    ReviewCount: Number,
    Rating: Number,
    StarImage: String,
    Tags: [{ Id: String, Category: Number, Name: String, Active: Boolean, DisplayLabel: String}],
    NegativeEffects: [{ Id: String, Category: Number, Name: String, Active: Boolean, DisplayLabel: String}],
    Flavors: [{ Id: String, Category: Number, Name: String, Active: Boolean, DisplayLabel: String}],
    Symptoms: [{ Id: String, Category: Number, Name: String, Active: Boolean, DisplayLabel: String}],
    Conditions: [{ Id: String, Category: Number, Name: String, Active: Boolean, DisplayLabel: String}],
    permalink: String,
    SortName: String,
    LogTags: [String],
    pricing: {
      gram: { type: Number, default: 20 },
      eighth: { type: Number, default: 60 },
      quad: { type: Number, default: 100 },
      half: { type: Number, default: 120 }
    },
    photos: [{ thumb: String, fullSize: String}]
  }),
  // ====================== //
  // =====Order Model===== //
  orderSchema = new Schema({
    order_date: Date,
    total: Number,
    items: [itemSchema],
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' }
  }),
  // ====================== //
  // =====location Model===== //
  locationSchema = new Schema({
    street: String,
    city: String,
    country: String,
    name: String
  }),
  // ====================== //
  // =====Patient Model===== //
  patientSchema = new Schema({
    email: String,
    fname: String,
    lname: String,
    password: String,
    expired: Boolean,
    admin: Boolean,
    active: Boolean,
    dob: Date,
    orders: [orderSchema],
    locations: [locationSchema],
    recUrl: String,
    recImg: {
      data: Buffer,
      contentType: String
    },
    idImg: {
      data: Buffer,
      contentType: String
    }

  })
// ====================== //
// =====Patient Methods===== //
patientSchema.pre('save', function (next) {
  // 'this' refers to the user being saved
  console.log('++++++Patient Model pre-save Running+++++++', this)
  if (!this.isModified('password')) return next()
  this.password = bcrypt.hashSync(this.password, 8)
  var messageToSend = newPatientAlert(this)
  twilioClient.sendSms('+15044731959', messageToSend)
  next()
})
// authenticate a user password
patientSchema.methods.authenticate = function (password) {
  var user = this
  return bcrypt.compareSync(password, user.password)
}
// ====================== //
// Alert functions
function newPatientAlert (patient) {
  console.log('======SENDING ALERT======', patient)
  return 'You have a new member! Name: ' + patient.fname + ' ' + patient.lname + 'Verify them here:'
}
// ====================== //
// =====Export Models===== //
module.exports = {
  Patient: mongoose.model('Patient', patientSchema),
  Order: mongoose.model('Order', orderSchema),
  Item: mongoose.model('Item', itemSchema),
  location: mongoose.model('Location', locationSchema)
}
