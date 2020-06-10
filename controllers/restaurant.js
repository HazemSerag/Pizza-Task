//Models
const Product = require('../models/product');
//End Models

exports.getHome = (req,res,next) => {
    Product.find()
    .then(products=>{
        console.log('Products')

        console.log(products)
        res.send(products)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getMenu = (req,res,next) => {
    res.send('<h1>Menu</h1>');
}

exports.addPizza = (req,res,next) => {

    const {title, description, price, imgUrl} =  req.body

    console.log(title)

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