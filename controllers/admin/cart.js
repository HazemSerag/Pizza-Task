//Models
const Cart = require('../../models/cart');
const Product = require('../../models/product');
//End Models

exports.getCart = (req,res,next) => {
    Cart.findById('5ee0170bfc167c520cfccb2d')
    .then(cart=>{

        res.send(cart)

    })
    .catch(err=>{
        console.log(err)
    })
}

exports.addToCart = (req,res,next) => {

    // console.log("back" + req.body.productId)
    const {productId:prodId, title, price, imgUrl, quantity }=req.body;

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
              title:title,
              price:price,
              imgUrl:imgUrl,
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
        res.status(201).send("cart updated");
    })
    .catch(err=>{
        console.log('error adding to cart')
        console.log(err)
    })
}