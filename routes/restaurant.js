// third-party lib
const express = require('express');

//controllers
const restaurantController = require('../controllers/restaurant') 

const cartController = require('../controllers/admin/cart') 

const orderController = require('../controllers/admin/order') 
//end controllers

const router = express.Router();

router.get('/', restaurantController.getHome)

router.get('/menu', restaurantController.getMenu)

router.get('/menu/:prodId', restaurantController.getProduct)

router.post('/api/add-pizza', restaurantController.addPizza)

router.get('/cart', cartController.getCart)

router.post('/api/add-to-cart', cartController.addToCart)

router.get('/orders', orderController.getOrder)

router.post('/api/add-order', orderController.addOrder)







module.exports = router;