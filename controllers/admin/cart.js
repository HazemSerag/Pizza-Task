//Models
const Cart = require('../../models/cart');
//End Models

exports.getCart = (req,res,next) => {
    Cart.find()
    .then(cart=>{
        console.log(cart)
        res.send('cart')
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.addToCart = (req,res,next) => {

    const prodId=req.body.productId;
    const quantity = req.body.quantity;

    let updatedCartItems = [];
    let existingCart;
    let addedProductIndex;
    let newQuantity = 1;

    Cart.findById('5ee0170bfc167c520cfccb2d')
    .then(cart=>{
        existingCart=cart;
    })
    .then(()=>{
        updatedCartItems = [...existingCart.items];
        addedProductIndex=  existingCart.items.findIndex(p => {
            return p.productId.toString() === prodId.toString();
        })
    })
    .then(()=>{
        if (addedProductIndex >= 0) {
            newQuantity = existingCart.items[addedProductIndex].quantity + quantity;
            updatedCartItems[addedProductIndex].quantity = newQuantity;
          } 
          else {
            updatedCartItems.push({
              productId: prodId,
              quantity: quantity
            });
        }
    })
    .then(()=>{
       Cart.findById('5ee0170bfc167c520cfccb2d')
       .then(myCart=>{
            myCart.items=updatedCartItems;
            return myCart.save()
       })
    })
    .then(()=>{
        res.send("cart updated");
    })
    .catch(err=>{
        console.log(err)
    })
}