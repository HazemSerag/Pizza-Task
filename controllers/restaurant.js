//Models
const Product = require('../models/product');
//End Models

exports.getHome = (req, res, next) => {
    Product.find()
        .then(products => {
            res.send(products)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getProduct = (req, res, nect) => {
    Product.findById(req.params.prodId)
        .then(product => {
            res.send(product)
        })
        .catch(err => {
            console.log(err)
        })
}
