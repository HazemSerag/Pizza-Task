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

  cart: {
    items: [{
      productId : {
        type: Schema.Types.ObjectId,
        ref:'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
});

userSchema.methods.addToCart = function(addedProduct,quantity){

    const {_id:prodId }=addedProduct;

    let newQuantity;
    const addedQuantity=quantity;
    console.log("Here " + addedQuantity)

    //check if the product already in Cart
    const addedProductIndex=  this.cart.items.findIndex(p => {
        return p.productId.toString() === prodId.toString();
    })
    const updatedCartItems = [...this.cart.items];
   
    if (addedProductIndex >= 0) {
        newQuantity = this.cart.items[addedProductIndex].quantity + addedQuantity;
        updatedCartItems[addedProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: prodId,
            quantity: addedQuantity
        });
    }
    const updatedCart = {
        items:updatedCartItems
    };
    this.cart=updatedCart;
    return this.save();
}

userSchema.methods.deleteCartItem = function(prodId){
    
    const updatedCartItems = this.cart.items.filter(p=>{
        return  p.productId.toString() !== prodId.toString()
    })
    this.cart.items=updatedCartItems;
    return this.save()
}

userSchema.methods.clearCart = function(){
    this.cart = {
        items:[]
    }
    return this.save();
}

module.exports = mongoose.model('User', userSchema);