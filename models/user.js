//Helpers
const helperFunctions = require('../helperFunctions');
//End Helpers


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required:true
  },
  password : {
    type:String,
    required:true
  },

  // cart: {
  //   items: [{
  //     productId : {
  //       type: Schema.Types.ObjectId,
  //       ref:'Product',
  //       required: true
  //     },
  //     quantity: {
  //       type: Number,
  //       required: true
  //     }
  //   }]
  // }
});

// userSchema.methods.addToCart = function(addedProduct,quantity){
//     this.cart =  helperFunctions.addToCart(this.cart,addedProduct,quantity)
//     return this.save();
// }

// userSchema.methods.deleteCartItem = function(prodId){
//      this.cart.items = helperFunctions.deleteCartItem(this.cart,prodId)
//     return this.save()
// }

userSchema.methods.clearCart = function(){
    this.cart = {
        items:[]
    }
    return this.save();
}

module.exports = mongoose.model('User', userSchema);