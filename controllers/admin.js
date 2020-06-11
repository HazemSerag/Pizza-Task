//Models
const Product = require('../models/product');
const Order = require('../models/order');

//End Models

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId') //get the full product object
        .execPopulate() //to return promise
        .then(user => {
            console.log(user.cart.items)
            const products = user.cart.items.map(p=>{
                return {
                    product:p.productId._doc,
                    quantity:p.quantity
                }
            })

            console.log("asa" + products)
            res.send(products)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.addToCart = (req, res, next) => {
    const {
        productId: prodId,
        quantity
    } = req.body;
    console.log("Here1" + quantity)
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product,quantity);
        })
        .then(() => {
            res.send({msg:'cart updated !'})
        })
        .catch(err => {
            console.log(err)
        })
}

exports.removeFromCart= (req,res,next)=>{
    const prodId=req.body.productId
    console.log("Id" + prodId)
    req.user.deleteCartItem(prodId)
    .then(result=>{
        res.send({msg:"Deleted from the cart"})
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getOrders = (req,res,next) =>{
    Order.find({'userId':req.user._id})
    .then(orders=>{
        console.log('console orders' + orders)
        res.send(orders);
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getOrder = (req,res,next) => {
    Order.findById(req.params.orderId)
    .then(order=>{
        res.send(order)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.addOrder = (req,res,next)=>{
    //dummy form for order details
    const orderDetails = {
        name:"Hazem",
        address:"Sefarat"
    }
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user=>{
        // pull off the full object of the product
        const cartItems=user.cart.items.map(product=>{
            return {
                product:product.productId._doc,
                quantity:product.quantity
            }
        })
        const order = new Order({
            items:cartItems,
            userId:req.user._id,
            details:orderDetails
        })

        return order.save();
    })
    .then(()=>{
        //clearing the cart after the order is finished
       return req.user.clearCart();
    })
    .then(result=>{
        res.send({msg:'order created'})
    })
    .catch(err=>{
        console.log(err)
    })

}

exports.addPizza = (req,res,next) => {
    const {title, description, price, imgUrl} =  req.body

    const addedPizza = new Product({
        title : title,
        description : description,
        price : price,
        imgUrl : imgUrl
    })

    addedPizza.save()
    .then(product=> {
        console.log('pizza Added')
        res.send(product)
    })
    .catch(err=>{
        console.log(err)
    })
}