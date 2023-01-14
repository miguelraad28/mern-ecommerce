const {Schema, model} = require("mongoose")

const roleSchema = new Schema({
    nombre: String,
},{
    versionKey: false
})

module.exports = model("Role", roleSchema)