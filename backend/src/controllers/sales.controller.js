const salesController = {}
const Sale = require("../models/Sale")
const Course = require("../models/Course")
const User = require("../models/User")
const mercadopago = require("mercadopago")
mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN,
});

salesController.createSale = async (req, res) => {
    const { client, products, shippingCost, subTotal, paymentMethod } = req.body
    const newSale = new Sale({
        client,
        products,
        shippingCost,
        subTotal,
        paymentMethod
    })
    if (paymentMethod === "mercadopago") {
        let preference = {
            id: newSale._id,
            items: [], back_urls: {
                success: "http://localhost:3000/purchaseSucceeded",
                failure: "https://www.freepik.com/free-vector/alert-concept-illustration_5423414.htm#query=failure&position=1&from_view=keyword",
                pending: "https://www.shutterstock.com/es/search/pending-stamp"
            },
            auto_return: "approved",
        }
        products.map(product => {
            preference.items.push({
                id: product._id,
                title: product.name,
                unit_price: Number(product.unitPrice),
                quantity: 1,
            })
        });
        const response = await mercadopago.preferences.create(preference);
// update data
//
products.map(async (product) => {
    const course = await Course.findById(product._id)
    if (course) {
        await User.findByIdAndUpdate(client, { $push: { accessTo: course._id } })
    }
})
await newSale.save()
await User.findByIdAndUpdate(client, { $push: { purchases: newSale._id } })
        console.log(response)
        res.json(response)
    } else if (paymentMethod === "paypal") {
        updateData()
        res.json({ message: "paypal" })
    } else if (paymentMethod === "transfer") {
        updateData()
        res.json({ message: "transfer" })
    }
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