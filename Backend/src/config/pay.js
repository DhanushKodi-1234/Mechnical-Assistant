import Razorpay from "razorpay"

const pay= new Razorpay({
   
    key_id: process.env.razorpayid,
    key_secret: process.env.razporkey
});


export default pay;