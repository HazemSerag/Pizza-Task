// third-party lib
const express = require('express');

//Controllers
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/sign-up', authController.signUp)

router.post('/login', authController.login)

router.post('/logout', authController.logout)


module.exports = router;
