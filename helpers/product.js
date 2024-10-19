module.exports.newProductsPrice = (products) => {
    const newProducts = products.map((item) => {
        item.newPrice = (item.price*(1-item.discountPercentage/100)).toFixed()
        return item
    })
    return newProducts;
}


module.exports.newOneProductPrice = (product) => {
    product.newPrice = (product.price*(1-product.discountPercentage/100)).toFixed()
    return product;
}