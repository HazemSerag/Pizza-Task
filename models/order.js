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
    // userId:{
    //     type:Schema.Types.ObjectId,
    //     required:true,
    //     ref:'User'
    // },
    details:{
        type:Object,
        required:true
    }
})

module.exports = mongoose.model('Order', orderSchema);