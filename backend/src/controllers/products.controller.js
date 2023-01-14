const productsController = {}
const Product = require("../models/Product")
const ProductCategory = require("../models/ProductCategory")

productsController.createProduct = async (req, res) => {
    const { name, description, category, price, offerPrice, stock, visibility } = req.body
    console.log(req)
    const newProduct = new Product({
        name,
        description,
        stock,
        price,
        offerPrice,
        visibility
    })

    const foundCategory = await ProductCategory.findOne({ name: { $in: category } })
    newProduct.category = foundCategory.name
    const productSaved = await newProduct.save()
    res.json({...productSaved})
}

module.exports = productsController