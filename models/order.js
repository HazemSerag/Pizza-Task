const mongoose = require('mongoose');
const { schema } = require('./user');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   
    items: [
        {
            product:{
                type:Object,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    details:{
        type:Object,
        required:true
    }
})

module.exports = mongoose.model('Order', orderSchema);