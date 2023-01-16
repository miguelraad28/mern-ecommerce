const express = require("express");
const cors = require("cors");
const { verifyToken, verifyAdminToken } = require("./middlewares/verifyJWT.js");
const {createSale} = require("./controllers/sales.controller")
// Server setup
const app = express();
app.use(express.json()); 
app.use(cors({
    origin: "*"
}));
app.use(express.static(__dirname + "/public"))

// Clients routes // Doesn't need token
app.use("/api/auth", require("./routes/auth.routes.js"))

// Products - Courses
app.use("/api/courses", require("./routes/courses.routes"))

// Purchases
app.use("/api/purchases", verifyToken, require("./routes/purchases.routes"))

// Sales
app.use("/api/sales", verifyAdminToken, require("./routes/sales.routes.js"))

// Checkout
app.post("/api/checkout", verifyToken, createSale)


module.exports = app