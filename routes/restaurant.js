// third-party lib
const express = require('express');

//controllers
const restaurantController = require('../controllers/restaurant') 

const cartController = require('../controllers/admin/cart') 


const router = express.Router();

router.get('/', restaurantController.getHome)

router.get('/menu', restaurantController.getMenu)

router.post('/api/add-pizza', restaurantController.addPizza)

router.get('/cart', cartController.getCart)

router.post('/api/add-to-cart', cartController.addToCart)





module.exports = router;