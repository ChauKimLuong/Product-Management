module.exports.newProductsPrice = (products) => {
    const newProducts = products.map((item) => {
        item.newPrice = parseFloat((item.price*(1-item.discountPercentage/100)).toFixed())
        return item
    })
    return newProducts;
}


module.exports.newOneProductPrice = (product) => {
    product.newPrice = parseFloat((product.price*(1-product.discountPercentage/100)).toFixed())
    return product;
}