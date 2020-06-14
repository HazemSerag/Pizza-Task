// third-party lib
const express = require('express');

//controllers
const restaurantController = require('../controllers/restaurant') 

const adminController = require('../controllers/admin')
//end controllers

//middlewars
const authMiddleware = require('../middleware/is-authorized')
//middlewars


const router = express.Router();

router.get('/', restaurantController.getHome)

router.get('/menu', restaurantController.getHome)

router.get('/menu/:prodId', restaurantController.getProduct)

router.get('/cart', adminController.getCart)

router.get('/orders',authMiddleware.authenticateToken ,adminController.getOrders)

router.get('/orders/:orderId', authMiddleware.authenticateToken,adminController.getOrder)

module.exports = router;