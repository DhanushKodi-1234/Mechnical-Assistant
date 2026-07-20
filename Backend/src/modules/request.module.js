
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    vehName: { type: String, required: true },
    vehCategory: { type: String, required: true },
    problemType: { type: String, required: true },
    mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic', required: true },
    distance: { type: Number, required: true },
    amount: { type: Number, required: true },
    image: { type: String, default: null },
    status: { type: String, default: 'Pending' }
  },
  { timestamps: true }
);

const Request = mongoose.model('Request', requestSchema, 'Requests');
export default Request;