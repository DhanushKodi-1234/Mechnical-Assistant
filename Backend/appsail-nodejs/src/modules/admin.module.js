import mongoose from "mongoose";

const admins= new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true },
    mob:{type:Number,required:true},
    email:{type:String,required:true},
    biketype:{type:String,required:true},
    
},
{timestamps:true});

const admin=mongoose.model('adminlogin', admins, 'adminlogin');
export default admin;