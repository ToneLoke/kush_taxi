var bcrypt = require('bcrypt'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  // =====Item Model===== //
  itemSchema = new Schema({
    name: String,
    img: {
      data: Buffer,
      contentType: String
    },
    type: String,
    thc: Number,
    pricing: {
      gram: Number,
      eigth: Number,
      quad: Number,
      half: Number
    },
    treats: [String]
  }),
  // ===== End Item Model===== //
  orderSchema = new Schema({
    order_date: Date,
    total: Number,
    items: [itemSchema],
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' }
  }),
  locationSchema = new Schema({
    street: String,
    city: String,
    country: String,
    name: String
  }),
  patientSchema = new Schema({
    email: String,
    fname: String,
    lname: String,
    password: String,
    expired: Boolean,
    dob: Date,
    orders: [orderSchema],
    locations: [locationSchema],
    recImg: {
      data: Buffer,
      contentType: String
    },
    idImg: {
      data: Buffer,
      contentType: String
    }

  })

patientSchema.pre('save', function (next) {
  // 'this' refers to the user being saved
  if (!this.isModified('password')) return next()
  this.password = bcrypt.hashSync(this.password, 8)
  next()
})

patientSchema.methods.authenticate = function (password) {
  var user = this
  return bcrypt.compareSync(password, user.password)
}

module.exports = {
  Patient: mongoose.model('Patient', patientSchema),
  Order: mongoose.model('Order', orderSchema),
  Item: mongoose.model('Item', itemSchema),
  location: mongoose.model('Location', locationSchema)
}
