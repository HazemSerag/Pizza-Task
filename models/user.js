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
  cart:{
    items:{
      type:Array,
    }
  }
});
userSchema.methods.storeCartItems = function(cartItems){
  this.cart.items=cartItems;
  return this.save()
}
module.exports = mongoose.model('User', userSchema);

