import mongoose from "mongoose";

const loginschema= new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true },
    mob:{type:Number,required:true},
    email:{type:String,required:true},
    reqtype:{type:String,required:true},
    image: {type: String,required:true,default: null }
},
{timestamps:true});

const lo=mongoose.model('login', loginschema, 'login');
export default lo;