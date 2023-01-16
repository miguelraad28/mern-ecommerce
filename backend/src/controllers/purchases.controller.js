const purchasesController = {}
const Sale = require("../models/Sale")

purchasesController.getPurchases = async(req, res) => {
    // aca debo recibir el id del usuario para devolver solo las PURCHASES que él ha realizado!
    const purchases = await Sale.find()
    console.log(purchases)
}
purchasesController.getPurchase = async(req, res) => {
    // aca debo recibir el id del usuario para devolver solo las PURCHASES que él ha realizado!
    const purchase = await Sale.findById(req.params.purchaseId)
}

module.exports = purchasesController