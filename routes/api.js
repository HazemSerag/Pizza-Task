// third-party lib
const express = require('express');

//controllers
const adminController = require('../controllers/admin')
//end controllers

const router = express.Router();

// /api/add-pizza
router.post('/add-pizza', adminController.addPizza)
// /api/add-to-cart
router.post('/add-to-cart', adminController.addToCart)

router.post('/delete-from-cart', adminController.removeFromCart)

router.post('/update-cart', adminController.updateCart)

router.post('/add-order', adminController.addOrder)

module.exports = router;


