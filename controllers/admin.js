//Models
const Product = require('../models/product');
const Order = require('../models/order');
//End Models

//Helpers
const helperFunctions = require('../helperFunctions')
//End Helpers

exports.getCart = (req, res, next) => {
    // if (req.user) {
    //     req.user
    //         .populate('cart.items.productId') //get the full product object
    //         .execPopulate() //to return promise
    //         .then(user => {
    //             console.log(user.cart.items)
    //             const products = user.cart.items.map(p => {
    //                 return {
    //                     product: p.productId._doc,
    //                     quantity: p.quantity
    //                 }
    //             })

    //             console.log("asa" + products)
    //             res.send(products)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // } else {

        const products= req.session.cart.items
        console.log(products)
        // .map(p=>{
        //     return{
        //         product:Product.findOne(p.id).then((product)=>{return product}),
        //         quantity:p.quantity
        //     }
        // })
        res.send(products)

        // const ids = req.session.cart.items.map(p=>{return p.productId})
        // Product.find({'_id': { $in: ids }})
        // .then(fullProducts=>{
        //     console.log(fullProducts)
        // })
        // req.session.cart.items[0]
        //     .populate({
        //         path: 'productId',
        //         populate: {
        //             path: 'products',
        //             model: 'Product'
        //         }
        //     })
        //     .exec(function (err, docs) {});

        // req.session.cart.items.populate('productId').populate({model:'Product'}).then((result)=>{
        //     console.log(result)
        // })
    // }

}

exports.addToCart = (req, res, next) => {
    const {
        productId: prodId,
        quantity
    } = req.body;
    // if (req.user) {
    //     Product.findById(prodId)
    //         .then(product => {
    //             return req.user.addToCart(product, quantity);
    //         })
    //         .then(() => {
    //             res.send({
    //                 msg: 'cart updated !'
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // } else {
        Product.findById(prodId)
            .then(product => {
                return helperFunctions.addToCart(req.session.cart, product, quantity,false)
            }).then((updatedCart) => {
                req.session.cart = updatedCart
            })
            .then(() => {
                res.send({
                    msg: "asa"
                })
            }).catch(err => {
                console.log(err)
            })

    // }

}

exports.removeFromCart = (req, res, next) => {
    const prodId = req.body.productId
    console.log("Id" + prodId)
    // if (req.user) {
    //     req.user.deleteCartItem(prodId)
    //         .then(result => {
    //             res.send({
    //                 msg: "Deleted from the cart"
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // } else {
       const updatedItems=  helperFunctions.deleteCartItem(req.session.cart,prodId);
       console.log(updatedItems)
       req.session.cart.items=updatedItems
       res.send({msg:"deleted"})
        //  req.session.cart= updatedCart;
            // .then(() => {
            //     res.send({
            //         msg: "cart updated"
            //     })
            // })
            // .catch(err => {
            //     console.log(err)
            // })
    // }

}

exports.getOrders = (req, res, next) => {
    // console.log(req.user._id)
    const userId = req.user._id
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
            res.send(order)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.addOrder = (req, res, next) => {

    console.log(req.body)
    //dummy form for order details
    const orderDetails = {
        name: "Hazem",
        address: "Sefarat",
        userId:req.user._id
    }
    // req.user
    //     .populate('cart.items.productId')
    //     .execPopulate()
    //     .then(user => {
    //         // pull off the full object of the product
    //         const cartItems = user.cart.items.map(product => {
    //             return {
    //                 product: product.productId._doc,
    //                 quantity: product.quantity
    //             }
    //         })
            const order = new Order({
                items: req.body,
                details: orderDetails
            })

             return order.save().then(()=>{
                 req.session.cart.items=[]
             }).then(msg=>{
                 res.send({msg:"order created"})
             }).catch(err=>{
                 console.log(err)
             })

        // })
        // .then(() => {
            //clearing the cart after the order is finished
            // return req.user.clearCart();
        // })
        // .then(result => {
            // res.send({
            //     msg: 'order created'
            // })
        // })
        // .catch(err => {
        //     console.log(err)
        // })

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