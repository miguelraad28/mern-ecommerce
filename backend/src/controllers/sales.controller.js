const salesController = {}
const Sale = require("../models/Sale")
const Course = require("../models/Course")
const User = require("../models/User")

salesController.createSale = async (req, res) => {
    const { client, products } = req.body
    const newSale = new Sale({
        client,
        products
    })
    let auxProductsPrices = []
    let totalAmountSale = 0
    const addProductsPrices = async() => {
        totalAmountSale = await auxProductsPrices.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    products.map(async (product) => {
        const productSold = await Course.findById(product._id)
        if(productSold.offerPrice && productSold.offerPrice > 0){
            auxProductsPrices.push(productSold.offerPrice)
        }else{
            auxProductsPrices.push(productSold.price)
        }
        addProductsPrices()
        console.log(totalAmountSale)
    })
    await User.findByIdAndUpdate(client, {$push:{purchases: newSale._id}})
    
    res.json(newSale)
    //await newSale.save()
}

salesController.getSales = async(req, res) => {
    const sales = await Sale.find()
    res.json(sales)
}

salesController.getSale = async(req, res) => {
    const sale = await Sale.findById(req.params.saleId)
    res.json(sale)
}

module.exports = salesController