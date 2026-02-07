const {mongoose} = require("mongoose");

const cartSchema = new mongoose.Schema({
  title: String,
  price:Number,
  category:String,
  image:String
});

module.exports = mongoose.model('carts', cartSchema);