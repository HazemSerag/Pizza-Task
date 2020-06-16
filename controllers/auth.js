//Models
const User = require('../models/user')
//End Models

//third party
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
//End third party

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'

    }
}))

exports.signUp = (req, res, next) => {
    const {
        email,
        username,
        password,
        confirmPassword
    } = req.body;
    User.findOne({
            "email": email
        })
        .then(user => {
            if (user) {
                return res.send({
                    msg: "Email already exists!",
                    success: false
                })
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        username: username,
                        password: hashedPassword,
                        cart: {
                            items: []
                        }
                    })

                    return user.save();
                })
                .then(() => {
                    res.send({
                        msg: "Signup Succeeded!",
                        success: true
                    })
                    return transport.sendMail({
                        to: email,
                        from: 'pizzaShop@delivery.com',
                        subject: 'Signup Succeeded!',
                        html: '<h1>Welcome to Pizza Shop family!</h1>'
                    }).catch(err => {
                        console.log(err)
                    })
                })
        }).catch(err => {
            console.log(err)
        })
}

exports.login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    User.findOne({
            "email": email.toLowerCase()
        })
        .then(user => {
            if (!user) {
                return res.send({
                    msg: "wrong email or password",
                    success: false
                })
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.cart.items = user.cart.items;
                        req.session.userId = user._id
                        //send JWT
                        const userInfo = {
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            cart: user.cart
                        }
                        const accessToken = jwt.sign(userInfo, 'mySecret');
                        return res.send({
                            accessToken,
                            userInfo,
                            success: true
                        })
                    }
                    res.send({
                        msg: "wrong email or password",
                        success: false
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })

}


exports.logout = (req, res, next) => {
    const userId = req.body.userId;
    User.findOne({
            "_id": userId
        })
        .then(user => {
            user.storeCartItems(req.session.cart.items)
        }).then(() => {

            return req.session.destroy();

        }).then(() => {
            res.send({
                msg: 'Logged Out',
                success: true
            })
        }).catch(err => {
            console.log(err)
        })
}