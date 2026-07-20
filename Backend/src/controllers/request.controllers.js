import Request from "../modules/request.module.js"; 
import mech from "../modules/mech.module.js";
export const raiseRequest = async (req, res) => {
    try {
        const { vehName, vehCategory, problemType, mechanicId, distance, amount } = req.body;
        const imagePath = req.file ? req.file.path : null;
        const newRequest = new Request({
            vehName,
            vehCategory,
            problemType,
            mechanicId,
            distance: parseFloat(distance),
            amount: parseFloat(amount),
            image: imagePath
        });
        await newRequest.save();
        return res.status(201).json({
            status: true,
            message: "Breakdown request submitted successfully",
            data: newRequest
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

export const getMechanicRequests = async (req, res) => {
    try {
        const filter = req.query.mechanicId ? { mechanicId: req.query.mechanicId } : {};
        const requests = await Request.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({ status: true, data: requests });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
// export const getMechanicRequests = async (req, res) => {
//     try {
//         const { mechanicId } = req.query;

//         if (!mechanicId) {
//             return res.status(400).json({
//                 status: false,
//                 message: "mechanicId is required"
//             });
//         }

//         const mechanic = await mech.findById(mechanicId);

//         if (!mechanic) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Mechanic not found"
//             });
//         }

//         if (mechanic.status !== "Approved") {
//             return res.status(403).json({
//                 status: false,
//                 message: "Mechanic not approved by admin"
//             });
//         }

//         const requests = await Request.find({ mechanicId })
//             .sort({ createdAt: -1 });

//         return res.status(200).json({
//             status: true,
//             data: requests
//         });

//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: error.message
//         });
//     }
// };

export const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedRequest = await Request.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedRequest) {
            return res.status(404).json({ status: false, message: "Request record not found" });
        }
        return res.status(200).json({
            status: true,
            message: `Request status changed to ${status}`,
            data: updatedRequest
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
 export default {
        updateRequestStatus,
        getMechanicRequests,
        raiseRequest,
    };