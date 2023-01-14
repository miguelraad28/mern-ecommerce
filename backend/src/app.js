const express = require("express");
const cors = require("cors");
// Server setup
const app = express();
app.use(express.json()); 
app.use(cors({
    origin: "https://mern-ecommerce-front.vercel.app/"
}));
app.use(express.static(__dirname + "/public"))

// Clients routes
app.use("/api/auth", require("./routes/client/auth.routes.js"))
app.get("/api/products", (req, res) =>{
    res.json({message: "getting"})
})

// Admin routes
app.get("/api/admin/users", (req, res) =>{
    res.json({message: "getting"})
})
app.get("/api/admin/products", (req, res) =>{
    res.json({message: "getting"})
})

module.exports = app