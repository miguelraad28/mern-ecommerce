const { Schema, model } = require("mongoose")

const saleSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            name: {
                type: Schema.Types.String,
                required:true
            },
            quantity: {
                type: Number,
                required: true
            },
            unitPrice: {
                type: Number,
                required: true
            },
            totalPrice:{
                type: Number,
                required: true
            }
        }
    ],
    shippingCost:{
        type: Number,
    },
    paymentMethod: {
        type: String,
        required: true
    }
},{
    timestamps: {
        createdAt: true,
        updatedAt: false
    },
    versionKey: false
})

module.exports = model("Sale", saleSchema)