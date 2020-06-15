exports.addToCart = function (cart, addedProduct, quantity) {
    const {
        _id: prodId
    } = addedProduct;

    let newQuantity;
    const addedQuantity = quantity;

    //check if the product already in Cart
    const addedProductIndex = cart.items.findIndex(p => {
        return p.product._id.toString() === prodId.toString();
    })
    const updatedCartItems = [...cart.items];

    if (addedProductIndex >= 0) {
        newQuantity = cart.items[addedProductIndex].quantity + addedQuantity;
        updatedCartItems[addedProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            product: addedProduct,
            quantity: addedQuantity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    return cart = updatedCart;
}

exports.deleteCartItem = function (cart, prodId) {
    return cart.items.filter(p => {
        return p.product._id.toString() !== prodId.toString()
    })
}