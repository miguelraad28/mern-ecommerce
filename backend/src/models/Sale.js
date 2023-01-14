const { Schema, model } = require("mongoose")

const saleSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        productQuantity: {
            type: Number,
            required: true
        }
    }
]
})

module.exports = model("Sale", saleSchema)