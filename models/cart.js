const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: [{
        productId : {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        title:{
          type: String,
          required: true
        },
        price:{
          type: Number,
          required: true
        },
        imgUrl:{
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }]
})



  

module.exports = mongoose.model('Cart', cartSchema);