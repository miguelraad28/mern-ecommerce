const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    roles: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    },
    purchases: [
        {
            type: Schema.Types.ObjectId,
            ref: "Sale"
        }
    ]

}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
userSchema.statics.comparePassword = async (recievedPassword, password) => {
    return await bcrypt.compare(recievedPassword, password)
}

module.exports = model("User", userSchema)