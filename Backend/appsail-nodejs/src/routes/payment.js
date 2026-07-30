    import express from "express";
    import pay from "../config/pay.js";

    const r = express.Router();
    r.post("/payment", async(req,res)=>{
    try{
        const { amount } = req.body;

            const options = {
                amount: amount * 100,
                currency: "INR",
                receipt: "receipt_" + Date.now()
            };

            const order = await pay.orders.create(options);

            res.json(order);

    }
    catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    });

    export default r;
