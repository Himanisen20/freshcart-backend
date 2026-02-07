const {mongoose} = require("mongoose");

const UserSchema = new mongoose.Schema({
  title: String,
  category:String,
  code:String,
  discription:String,
  image:String,
  status:String,
  weight:String,
  price:String
});

module.exports = mongoose.model('Addproduct', UserSchema);