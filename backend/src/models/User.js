const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
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
    purchases: [
        {
            type: Schema.Types.ObjectId,
            ref: "Sale"
        }
    ],
    accessTo: [
        {
            type: String
        }
    ],
    roles: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: "Role"
        },
        name: {
            type: Schema.Types.String,
            ref: "Role"
        }
    },
    account: {
        type: String,
        required: true,
        default: "pending"
    },
    accountConfirmation: {
        confirmationCode: {
            type: Number
        },
        confirmationCodeExpiresAt: {
            type: Date
        }
    }
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