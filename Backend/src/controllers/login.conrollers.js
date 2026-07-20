import lo from "../modules/login.module.js";
import multer from "multer";
import admin from "../modules/admin.module.js";
import mech from "../modules/mech.module.js";
export const valdation= async(req,res)=>{
    try{
       const { name, password, email, mob, reqtype } = req.body;
        console.log(req.body.name);
         if (!name) {
            console.log('Name must be entered')
            return res.status(400).json({ message: 'Name is required' });
        }
          const mobStr = mob ? mob.toString().trim() : '';
        if (!mobStr || mobStr.length !== 10) {
            console.log('Mobile must have 10 digits');
            return res.status(400).json({ message: 'Mobile must be 10 digits' });
        }
         const emailval = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailval.test(email)) {
            console.log('Enter valid email address');
            return res.status(400).json({ message: 'Enter valid email address' });
        }
        const imgpath=req.file? req.file.path: null;
        const newdata=await lo.create({
            name: name,
            password,
            email:email,
            mob:mob,
            reqtype:reqtype,
            image: imgpath
        })
        console.log('Login credientails stroed sucessfully');
        return res.status(201).json({ 
            success: true, 
            message: 'Registration successful!', 
            data: newdata 
        });
    }
    catch(err){
        console.log('Validation not done',err);
    }
}
export const loginuser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!password || (!email && !mob)) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        const user = await admin.findOne({ email, password });

        if (!user) {
            console.log("Invalid login attempt for:", email);
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        console.log("User logged in successfully:", user.email);
        return res.status(200).json({ 
            status: true, 
            message: 'Login successful', 
            data: { email: user.email, name: user.name } 
        });
    } catch (err) {
        console.error('Error in login function:', err);
        return next(err);
    }
}
export const mlogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        const user = await mech.findOne({ email, password });
        if (!user) {
            console.log("Invalid email or password match attempt");
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        console.log("Mechanic login in success:", user.email);
        return res.status(200).json({ 
            status: true, 
            message: 'Login successful', 
            data: {
                email: user.email,
                name: user.shopname  
            } 
        });
    }
    catch (err) {
        console.log('Error in executing login:', err);
        return next(err);
    }
}
export const valdationadmin= async(req,res)=>{
    try{
       const { name, password, email, mob, reqtype,biketype } = req.body;
        console.log(req.body.name);
         if (!name) {
            console.log('Name must be entered')
            return res.status(400).json({ message: 'Name is required' });
        }
          const mobStr = mob ? mob.toString().trim() : '';

        if (!mobStr || mobStr.length !== 10) {
            console.log('Mobile must have 10 digits');
            return res.status(400).json({ message: 'Mobile must be 10 digits' });
        }
         const emailval = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailval.test(email)) {
            console.log('Enter valid email address');
            return res.status(400).json({ message: 'Enter valid email address' });
        }
        
        const newdata=await admin.create({
            name: name,
            password,
            email:email,
            mob:mob,
            biketype:biketype
        })
        console.log('Login credientails stroed sucessfully');
        return res.status(201).json({ 
            success: true, 
            message: 'Registration successful!', 
            data: newdata 
        });
    }
    catch(err){
        console.log('Validation not done',err);
    }
}
 export default {
        valdation,
        loginuser,
        valdationadmin,
        mlogin
    };