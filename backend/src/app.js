const express = require("express");
const cors = require("cors");
const { verifyToken, verifyAdminToken } = require("./middlewares/verifyJWT.js");
// Server setup
const app = express();
app.use(express.json()); 
app.use(cors({
    origin: "*"
}));
app.use(express.static(__dirname + "/public"))

// Authentication
app.use("/api/auth", require("./routes/auth.routes.js"))

// Account Data - Clients Routes
app.use("/api/myAccount", verifyToken, require("./routes/account.routes"))

// Admin Routes
app.use("/api/admin", verifyAdminToken, require("./routes/admin.routes.js"))



module.exports = app