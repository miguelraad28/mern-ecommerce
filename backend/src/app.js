const express = require("express");
const cors = require("cors");
const create = require("./libs/initialSetup.js");
const { verifyAdminToken } = require("./middlewares/verifyJWT.js");
// Server setup
const app = express();
create()
app.use(express.json()); 
app.use(cors({
    origin: "*"
}));
app.use(express.static(__dirname + "/public"))

// Clients routes
app.use("/api/auth", require("./routes/client/auth.routes.js"))

// Admin routes
app.use("/api/admin/products", verifyAdminToken, require("./routes/admin/products.routes.js"))

module.exports = app