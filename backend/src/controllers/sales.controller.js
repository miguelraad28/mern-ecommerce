const salesController = {}
const Sale = require("../models/Sale")
const Course = require("../models/Course")
const User = require("../models/User")
const axios = require("axios")
const mercadopago = require("../utils/mercadopago")

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
                success: "http://localhost:3000/purchaseFinished",
                failure: "http://localhost:3000/purchaseFinished",
                pending: "http://localhost:3000/purchaseFinished"
            },
            metadata: {
                user_id: client,
                sale_id: newSale._id
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
        await newSale.save()
        await User.findByIdAndUpdate(client, { $push: { purchases: newSale._id } })
        res.json({ purchaseId: response.body.id, redirectTo: response.body.init_point })
    } else if (paymentMethod === "paypal") {

        res.json({ message: "paypal" })
    } else if (paymentMethod === "transfer") {

        res.json({ message: "transfer" })
    }
}

salesController.verifyPayment = async (req, res) => {
    const paymentId = req.mpData?.paymentId;
    //    const preferenceId = req.mpData.preferenceId;
    try {
        const paymentResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        })
        if (paymentResponse.data.status === "approved") {
            const sale = await Sale.findByIdAndUpdate(paymentResponse.data.metadata.sale_id, { status: paymentResponse.data.status })
            const { products } = sale
            await products.map(async (product) => {
                const course = await Course.findById(product._id)
                const userBuyer = await User.findOne({ _id: paymentResponse.data.metadata.user_id })
                if (userBuyer._doc.accessTo.includes(course._id)) {
                    console.log("Ya se han dado accesos")
                } else {
                    await User.findByIdAndUpdate(paymentResponse.data.metadata.user_id, { $push: { accessTo: course._id } })
                }
            })
            return res.json(paymentResponse.data.status)
        } else {
            return res.json(paymentResponse)
        }
    } catch (error) {
        console.log(error)
    }

}

salesController.getSales = async (req, res) => {
    res.json(await Sale.find())
}

salesController.getSale = async (req, res) => {
    res.json(await Sale.findById(req.params.saleId))
}

module.exports = salesController