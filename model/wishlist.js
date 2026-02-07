const {mongoose} = require("mongoose");

const wishSchema = new mongoose.Schema({
  title: String,
  price:Number,
  category:String,
  image:String
});

module.exports = mongoose.model('wishlist', wishSchema);