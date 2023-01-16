const purchasesController = {}
const Sale = require("../models/Sale")

purchasesController.getPurchases = async(req, res) => {
    const purchases = await Sale.find()
    console.log(purchases)
}
purchasesController.getPurchase = async(req, res) => {
    const purchase = await Sale.findById(req.params.purchaseId)
}

module.exports = purchasesController