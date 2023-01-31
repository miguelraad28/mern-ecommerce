const express = require("express");
const cors = require("cors");
const { verifyToken, verifyAccessToCourse, verifyAdminToken } = require("./middlewares/verifyJWT.js");
const axios = require("axios");
const { createSale } = require("./controllers/sales.controller.js");
// Server setup
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://api.mercadopago.com"],
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

// Verify User Payment
app.post('/api/verifyPayment', verifyToken, async (req, res) => {
    const paymentId = req.body.paymentId;
    try {
        const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
            }
        });

        if (response.data.status === 'approved') {
            // payment was approved
            res.status(200).json({ message: 'Payment approved' });
        } else {
            // payment was not approved
            res.status(400).json({ message: 'Payment not approved' });
        }
    } catch (error) {
        //console.log(error);
        res.status(500).json({ message: 'Error while trying to verify payment' });
    }
});

module.exports = app
