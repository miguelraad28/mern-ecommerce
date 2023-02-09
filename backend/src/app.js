const express = require("express");
const cors = require("cors");
const { verifyToken, verifyAccessToCourse, verifyAdminToken } = require("./middlewares/verifyJWT.js");
const axios = require("axios");
// Server setup
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    //origin: [process.env.CORS_POLICY_FRONT_END, process.env.CORS_POLICY_MP],
}));
app.use("/public", express.static(__dirname + "/public"))
app.use("/private", verifyAccessToCourse, express.static(__dirname + "/private"))

// Admin Routes
app.use("/api/admin", verifyAdminToken, require("./routes/admin.routes"))
// Public routes
app.use("/api", require("./routes/public.routes"))

// Authentication
app.use("/api/auth", require("./routes/auth.routes.js"))

// Account Data - Clients Routes
app.use("/api/myAccount", verifyToken, require("./routes/account.routes"))


app.use("/api/checkout", verifyToken, require("./routes/checkout.routes"))

module.exports = app
