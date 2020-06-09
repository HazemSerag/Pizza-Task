// Core Global Modules
// End Core Global Modules


//Third party
const express = require('express');
const bodyParser = require('body-parser');
// End Third Party

//Constants
const app = express();
const port = process.env.PORT || 8080;
//End Constants

//Configurations
app.use(bodyParser.urlencoded({
    extended: false
}))
//End Configurations


app.get('/' , (req,res,next)=>{
    console.log('Helloo')
    res.send('<h1>hello<h1>')
})

app.listen(port);
