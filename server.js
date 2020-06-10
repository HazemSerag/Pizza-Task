// Core Global Modules
const path = require('path');
// End Core Global Modules

// Custom local modules
const restaurantRoutes = require('./routes/restaurant')
// End custom local moudles



//Third party
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// End Third Party

//Constants
const app = express();
const port = process.env.PORT || 8080;
const mainDirectory = path.dirname(process.mainModule.filename);
const MongoConnection_URI = 'mongodb+srv://pizza-app:JBoqAXm1NSJgaKPF@cluster0-aulyz.mongodb.net/pizza-shop?retryWrites=true&w=majority';
//End Constants

//Configurations
app.use(bodyParser.json())

app.use(express.static(path.join(mainDirectory, 'pizza-angular')))
//End Configurations


app.use(restaurantRoutes);

app.get('/' , (req,res,next)=>{
    console.log('Helloo')
    res.send('<h1>hello<h1>')
})

mongoose.connect(MongoConnection_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected via Mongoose')
    app.listen(port);
})
.catch(err => {
    console.log(err)
})
