require("dotenv").config()
console.log(process.env.MONGODB_URI, process.env.PORT)
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection

connection.once("open",() => {
    console.log(`DB conectada MONGODB`)
})