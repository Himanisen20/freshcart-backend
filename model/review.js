const{mongoose}= require("mongoose")

const reviewSchema= new mongoose.Schema({
   
    productId:String,
    reviewname:String,
    reviewcity:String,
    reviewmsg:String,
    reviewDate: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('review',reviewSchema)