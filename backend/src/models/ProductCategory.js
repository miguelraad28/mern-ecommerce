const {Schema, model} = require("mongoose")

const productCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: [
        {
            type: String
        }
    ]
})

module.exports = model("productCategory", productCategorySchema)