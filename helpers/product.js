module.exports.newProductPrice = (products) => {
    const newProducts = products.map((item) => {
        item.newPrice = (item.price*(1-item.discountPercentage/100)).toFixed()
        return item
    })
    return newProducts;
}