//Models
const Product = require('../models/product');
const Order = require('../models/order');
//End Models

//third party
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
//End third party

//Helpers
const helperFunctions = require('../helperFunctions')
//End Helpers


const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'

    }
}))

exports.getCart = (req, res, next) => {
    const products = req.session.cart.items
    res.send(products)
}

exports.addToCart = (req, res, next) => {
    const {
        productId: prodId,
        quantity
    } = req.body;
    Product.findById(prodId)
        .then(product => {
            return helperFunctions.addToCart(req.session.cart, product, quantity)
        }).then((updatedCart) => {
            req.session.cart = updatedCart
        })
        .then(() => {
            res.send({
                msg: "Added to cart",
                success: true
            })
        }).catch(err => {
            console.log(err)
        })
}

exports.removeFromCart = (req, res, next) => {
    const prodId = req.body.productId
    const updatedItems = helperFunctions.deleteCartItem(req.session.cart, prodId);
    req.session.cart.items = updatedItems
    res.send({
        msg: "Removed",
        success: true
    })
}

exports.updateCart = (req, res, next) => {
    const updatedCartItems = req.body;
    req.session.cart.items = updatedCartItems;
    res.send({
        msg: "cart updated",
        success: true
    })
}

exports.getOrders = (req, res, next) => {
    const userId = req.session.userId
    Order.find({
            'details.userId': `${userId}`
        })
        .then(orders => {
            res.send(orders);
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getOrder = (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => {
            if (order.details.userId.toString() === req.session.userId.toString()) {
                return res.send(order)
            }
            res.send({
                msg: "Not Authorized"
            })

        })
        .catch(err => {
            console.log(err)
        })
}

exports.addOrder = (req, res, next) => {
    const {
        items,
        details,
        currency,
        totalPrice
    } = req.body
    const order = new Order({
        items: items,
        details: details,
        currency: currency,
        totalPrice: totalPrice
    })

    return order.save().then(() => {
        req.session.cart.items = []
    }).then(msg => {
        res.send({
            msg: "Thank you! The order has been received and it will arrive to you within 45min, for order details you can check your Email Adress.",
            success: true
        })

        return transport.sendMail({
            to: details.email,
            from: 'pizzaShop@delivery.com',
            subject: 'Your Order Details',
            html: `
                <h1>Dear ${details.name}, we received your Order.</h1>
                <h1>You ordered a new order with ${totalPrice}${currency}.</h1>
                <h2>To : ${details.address}</h2>
                <h3>Thank you</h3>
            `
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })

}

///for adding products
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
            res.send(product)
        })
        .catch(err => {
            console.log(err)
        })
}