const { Schema, model } = require("mongoose")

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
    },
    priceUSD: {
        type: Number,
    },
    offerPriceUSD: {
        type: Number,
    },
    visibility: {
        type: Boolean,
        default: true
    },
    source: [
        {
            type:String,
            required:true
        }
    ],
    tumbnail: {
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: false,
    versionKey: false
})

module.exports = model("Course", courseSchema)