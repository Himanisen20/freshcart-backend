const {mongoose} = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: String,
  email:String,
  password:String,
  contact:String,
  address:String,
  newpassword:String
});

module.exports = mongoose.model('Users', UserSchema);