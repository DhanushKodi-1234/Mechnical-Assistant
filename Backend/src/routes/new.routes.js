
import { Router } from "express";
const routerr = Router();

routerr.get('/test', (req, res) => {
    console.log("hi");
    return res.status(200).json({
        message: 'Hi'
    });
});

export default routerr;
