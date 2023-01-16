const salesController = {}
const Sale = require("../models/Sale")
const Course = require("../models/Course")
const User = require("../models/User")

salesController.createSale = async (req, res) => {
    const { client, products, shippingCost, subTotal, paymentMethod } = req.body
    const newSale = new Sale({
        client,
        products,
        shippingCost,
        subTotal,
        paymentMethod
    })
    products.map(async (product) => {
        const course = await Course.findById(product._id)
        if(course){
            await User.findByIdAndUpdate(client, {$push:{accessTo: course._id}})
        }
    })
    await newSale.save()
    await User.findByIdAndUpdate(client, {$push:{purchases: newSale._id}})
    res.json(newSale)
}

salesController.getSales = async (req, res) => {
    const sales = await Sale.find()
    res.json(sales)
}

salesController.getSale = async (req, res) => {
    const sale = await Sale.findById(req.params.saleId)
    res.json(sale)
}

module.exports = salesController