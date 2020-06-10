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
    console.log(req.body)
    const prodId=req.body.productId;
    const quantity = req.body.quantity;
    let updatedCartItems = [];
    

    let existingCart;
    let addedProductIndex;
    let newQuantity = 1;
    

     Cart.findById('5ee0170bfc167c520cfccb2d')
    .then(cart=>{
        existingCart=cart;
    }).then(()=>{
        updatedCartItems = [...existingCart.items];
        addedProductIndex=  existingCart.items.findIndex(p => {
            return p.productId.toString() === prodId.toString();
        })
    }).then(()=>{
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
       return Cart.findByIdAndUpdate('5ee0170bfc167c520cfccb2d', {items:updatedCartItems})
    })
    .then(()=>{
        res.send("cart updated");
    })
    .catch(err=>{
        console.log(err)
    })




    // res.send('asas')



    // console.log(existingCart);

    // const addedProductIndex = .items.findIndex(p => {
    //     return p.productId.toString() === product._id.toString();
    //   })

    // const newCart = new Cart({
    //     items:[{productId:req.body.productId, quantity:req.body.quantity}]
    // })

    // newCart.save()
    // .then(result=>{
    //     res.send('cart creatd')

    // })
    // .catch(err=>{
    //     console.log(err)
    // })
    

}