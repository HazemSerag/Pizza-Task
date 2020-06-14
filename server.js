// Core Global Modules
const path = require('path');
// End Core Global Modules

// Custom local modules
const restaurantRoutes = require('./routes/restaurant')
const adminRoutes = require('./routes/api')
const authRoutes = require('./routes/auth')
// End custom local moudles

//Models
const User = require('./models/user')
//End Models



//Third party
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore= require('connect-mongodb-session')(session)
// End Third Party

//Constants
const app = express();
const port = process.env.PORT || 8080;
const mainDirectory = path.dirname(process.mainModule.filename);
const MongoConnection_URI = 'mongodb+srv://pizza-app:JBoqAXm1NSJgaKPF@cluster0-aulyz.mongodb.net/pizza-shop';
const store = new MongoDBStore({
    uri:MongoConnection_URI,
    collection:'sessions'
});
//End Constants


//Configurations
app.use(cors())

app.use(bodyParser.json())

app.use(express.static(path.join(mainDirectory, 'pizza-angular/dist/pizza-angular')))
//End Configurations

app.use(session({
    secret:'abc',
    resave:false,
    saveUninitialized:false,
    store:store
}))

// app.use((req, res, next) => {
//     User.findById('5ee24009ecd72032acc2e1f3')
//         .then(user => {
//             req.user = user;
//             next()
//         })
//         .catch(err => {
//             console.log(err)
//         })

//         throw new Error('asdsa')
// })


app.use((req,res,next)=>{
    if(!req.session.cart){
        req.session.cart={items:[]};
    }
    next()
})

app.use('/auth',authRoutes);

app.use('/api',adminRoutes);

app.use('/restaurant',restaurantRoutes);

app.get('*', (req, res, next) => {
    res.sendFile(path.join(mainDirectory, 'pizza-angular/dist/pizza-angular/index.html'))
})

//Error global handling function
app.use((error,req,res,next)=>{
    console.log('global Error')
    res.sendFile(path.join(mainDirectory, '500.html'))

})




mongoose.connect(MongoConnection_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected via Mongoose')

        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    username: 'Hazem',
                    email: "hazemserag@gmail.com",
                    password: "123456",
                    cart: {
                        items: []
                    }
                })
                user.save()
            }

        })

        app.listen(port);
    })
    .catch(err => {
        console.log(err)
    })  