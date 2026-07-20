import mongoose from "mongoose";

const mschema= new mongoose.Schema(
     {
shopname: { type: String, required: true },
    email: { type: String, required: true },
    mob: { type: String, required: true },
    password: { type: String, required: true }, 
    shopadd: { type: String, required: true },
    cname:{ type: String, required: true },
    status: { type: String, default: 'Pending' },
        latitude:{type:Number, required:true},
    longitude:{type:Number, required:true},
    perKmCharge:{type:Number, required:true}
  },
  {timestamps: true}
);

const mech=mongoose.model('Mechanic', mschema, 'Mechanic');
export default mech;