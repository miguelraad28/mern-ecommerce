const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://miguelraad28:KONbsualPqOi6kGs@cluster0.zhgpoxi.mongodb.net/?retryWrites=true&w=majority");

const connection = mongoose.connection

connection.once("open",() => {
    console.log(`DB conectada mongodb+srv://miguelraad28:KONbsualPqOi6kGs@cluster0.zhgpoxi.mongodb.net/?retryWrites=true&w=majority`)
})