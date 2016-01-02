var
  mongoose = require('mongoose'),
  Schema   = mongoose.Schema

var itemSchema = new Schema({
  name: String,
  img: { data: Buffer, contentType: String },
  type: String,
  thc: Number,
  pricing: { gram: Number, eighth: Number, quad: Number, half: Number },
  treats: [String]
})
var orderSchema = new Schema({
  order_date: Date,
  total: Number,
  items: [ itemSchema ]
})
var locationSchema = new Schema({
  street: String,
  city: String,
  country: String,
  name: String
})
var patientSchema = new Schema({
  email: String,
  fname: String,
  lname: String,
  password: String,
  expired: Boolean,
  dob: Date,
  orders: [ orderSchema ],
  locations: [ locationSchema ],
  recImg: { data: Buffer, contentType: String },
  idImg: { data: Buffer, contentType: String }

})

module.exports = {
  Patient: mongoose.model('Patient', patientSchema),
  Order: mongoose.model('Order', orderSchema),
  Item: mongoose.model('Item', itemSchema),
  location: mongoose.model('Location', locationSchema),
}
