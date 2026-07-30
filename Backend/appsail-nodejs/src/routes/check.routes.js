import express from "express";
import { Router } from "express";
import multer from "multer";
import { getm,store,approveMechanic,getmsucess} from "../controllers/mech.controllers.js";
import { adminLogin } from "../controllers/adminl.controllers.js";
import { valdation,loginuser, valdationadmin,mlogin } from "../controllers/login.conrollers.js";
import { raiseRequest, getMechanicRequests, updateRequestStatus } from "../controllers/request.controllers.js";

const router =Router();
const upload = multer({ dest: "uploads/" });
router.post('/admin/login', adminLogin);
router.post('/signupadmin', valdationadmin);
router.post('/signup', valdation);
router.post('/login', loginuser);
router.post('/mechanic/signup', store);
router.post('/mechanic/login', mlogin);
router.get('/mechanics', getm);
router.get('/mechanics/sucess', getmsucess);
router.put('/mechanics/:id', approveMechanic);
router.post('/requests/raise', upload.single("image"), raiseRequest);
router.get('/requests', getMechanicRequests);
router.put('/requests/:id', updateRequestStatus);

// router.get('/login', (req,res)=>{
//     res.json({message:"testing check"})
// })

// router.post('/register', (req, res) => {
//     const { name, email } = req.body;
//     res.status(201).json({ 
//         message: "User registered successfully", 
//         data: { name, email } 
//     });
// });

export default router;