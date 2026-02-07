const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: Array,
  address: Object,
  totalAmount: Number,
  paymentMode :String,
  date: {
  type: Date,
  default: Date.now
},

});

module.exports = mongoose.model("Order", orderSchema);
