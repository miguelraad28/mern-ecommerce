const express = require("express");
const cors = require("cors");
const { verifyToken, verifyAccessToCourse, verifyAdminToken } = require("./middlewares/verifyJWT.js");
const {createSale} = require("./controllers/sales.controller")
// Server setup
const app = express();
app.use(express.json()); 
app.use(cors({
    origin: 'https://mern-ecommerce-front.vercel.app'
}));
app.use("/public", express.static(__dirname + "/public"))
app.use("/private", verifyAccessToCourse, express.static(__dirname + "/private"))

// Authentication
app.use("/api/auth", require("./routes/auth.routes.js"))

// Public routes
app.use("/api", require("./routes/public.routes"))

// Account Data - Clients Routes
app.use("/api/myAccount", verifyToken, require("./routes/account.routes"))

// Admin Routes
app.use("/api/admin", verifyAdminToken, require("./routes/admin.routes.js"))

app.post("/api/checkout", verifyToken, createSale)


module.exports = app
