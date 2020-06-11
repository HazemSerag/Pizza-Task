//Models
const Order = require('../../models/order');
const Cart = require('../../models/cart');
// const Product = require('../../models/Product');

//End Models

exports.getOrder = (req,res,next) =>{
    Order.find()
    .then(orders=>{
        console.log('console orders' + orders)
        res.send(orders);
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.addOrder = (req,res,next)=>{
    let myCart;
    Cart.findById('5ee0170bfc167c520cfccb2d')
    .then(cart=>{
        console.log(cart)
        myCart=cart;
        const cartItems = cart.items.map(product=>{
            return {
                product:{
                    productId:product.id,
                    title:product.title,
                    price:product.price
                },
                quantity:product.quantity
            }
        })

        return cartItems
    })
    .then((items)=>{
        const newOrder = new Order({
            items:items
        })
        return newOrder.save();
    })
    .then(()=>{
        myCart.items=[];
        return myCart.save();
    })
    .then(()=>{
        res.send('orderd added')
    })
    .catch(err=>{
        console.log(err)
    })
}