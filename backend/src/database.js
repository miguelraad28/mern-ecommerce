require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection

connection.once("open",() => {
    console.log(`DB conectada MONGODB`)
})