const ProductCategory = require("../models/product-category.model.js")

module.exports.getCategory = async (category) => {
    let categoryArr = [] 
    const getCategoryMain = async (category) => {

        categoryArr.push(category)

        const childrentCategory = await ProductCategory.find({
            deleted: false, 
            status: "active",
            parent_id: category.id,
        })
        
        if (childrentCategory && childrentCategory.length > 0){
            for (const child of childrentCategory) {
                await getCategoryMain(child)
            }
        }
        return categoryArr
    }

    const result = await getCategoryMain(category)
    return result
}