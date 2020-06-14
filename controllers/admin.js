//Models
const Product = require('../models/product');
const Order = require('../models/order');
//End Models

//Helpers
const helperFunctions = require('../helperFunctions')
//End Helpers

exports.getCart = (req, res, next) => {
    // throw new Error('asd')
    const products = req.session.cart.items
    console.log(products)
    res.send(products)
}

exports.addToCart = (req, res, next) => {
    const {productId: prodId, quantity} = req.body;
    Product.findById(prodId)
        .then(product => {
            return helperFunctions.addToCart(req.session.cart, product, quantity, false)
        }).then((updatedCart) => {
            req.session.cart = updatedCart
        })
        .then(() => {
            res.send({
                msg: "Added to cart",
                success:true
            })
        }).catch(err => {
            console.log(err)
        })
}

exports.removeFromCart = (req, res, next) => {
    const prodId = req.body.productId
    console.log("Id" + prodId)
    const updatedItems = helperFunctions.deleteCartItem(req.session.cart, prodId);
    console.log(updatedItems)
    req.session.cart.items = updatedItems
    res.send({
        msg: "Removed",
        success:true
    })
}

exports.updateCart = (req,res,next)=>{
    console.log(req.session.cart)
    const updatedCartItems = req.body;
    req.session.cart.items=updatedCartItems;
    res.send({msg:"cart updated", success:true})
}

exports.getOrders = (req, res, next) => {
    const userId = req.session.userId
    Order.find({
            'details.userId': `${userId}`
        })
        .then(orders => {
            console.log('console orders' + orders)
            res.send(orders);
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getOrder = (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => {
            if(order.details.userId.toString() === req.session.userId.toString()){
                console.log('Order is Mine')
               return res.send(order)
            }

            console.log('Order is not Mine')
            res.send("Not Authorized")

        })
        .catch(err => {
            console.log(err)
        })
}

exports.addOrder = (req, res, next) => {

    console.log(req.body)
    //dummy form for order details
    const orderDetails = req.body.details
    const order = new Order({
        items: req.body.items,
        details: orderDetails
    })

    return order.save().then(() => {
        req.session.cart.items = []
    }).then(msg => {
        res.send({
            msg: "Order created",
            success:true
        })
    }).catch(err => {
        console.log(err)
    })

}

exports.addPizza = (req, res, next) => {
    const {
        title,
        description,
        price,
        imgUrl
    } = req.body

    const addedPizza = new Product({
        title: title,
        description: description,
        price: price,
        imgUrl: imgUrl
    })

    addedPizza.save()
        .then(product => {
            console.log('pizza Added')
            res.send(product)
        })
        .catch(err => {
            console.log(err)
        })
}