import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/projectm';


   const coonectdb=async()=>{
    try{
        await mongoose.connect(url);
        console.log('DB Connecion sucessfully')
    }
    catch(err){
         console.error('Db Not connected:', err);
        throw err;
    }
   };

export default coonectdb;