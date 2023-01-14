const { Schema, model } = require("mongoose")

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        name: {
            type: Schema.Types.String,
            ref: "ProductCategory"
        },
        tags: {
            type: Schema.Types.Array,
            ref: "ProductCategory"
        }
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Product", productSchema)