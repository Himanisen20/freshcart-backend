const {mongoose}= require("mongoose")

const addressSchema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  email:String,
  contact:String,
  address:String,
  city:String,
  state:String,
  zip:String
})

module.exports = mongoose.model('Address',addressSchema)