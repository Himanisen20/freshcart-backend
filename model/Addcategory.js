const {mongoose} = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  product:Number,
  category:String,
  image:String,
  status:String
});

module.exports = mongoose.model('category', categorySchema);