// import mongoose from "mongoose";
// import "dotenv/config";

// // const url = 'mongodb://localhost:27017/projectm';
// const url = process.env.MONGO_URL;

//    const coonectdb=async()=>{
//     try{
//         await mongoose.connect(url);
//         console.log('DB Connecion sucessfully')
//     }
//     catch(err){
//          console.error('Db Not connected:', err);
//         throw err;
//     }
//    };

// export default coonectdb;

import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.MONGO_URL;

const coonectdb = async () => {
    try {
        // console.log(url);
        // console.log(process.env.MONGO_URL);
        await mongoose.connect(url);
        console.log("DB Connection successfully");
    } catch (err) {
        console.error(err);
    throw err;
    }
};

export default coonectdb;