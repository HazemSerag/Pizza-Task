// third-party lib
const express = require('express');

//controllers
const restaurantController = require('../controllers/restaurant') 

// const cartController = require('../controllers/admin/cart') 

// const orderController = require('../controllers/admin/order') 

const adminController = require('../controllers/admin')
//end controllers

const router = express.Router();

router.get('/', restaurantController.getHome)

router.get('/menu', restaurantController.getHome)

router.get('/menu/:prodId', restaurantController.getProduct)

router.get('/cart', adminController.getCart)

router.get('/orders', adminController.getOrders)

router.get('/orders/:orderId', adminController.getOrder)

module.exports = router;