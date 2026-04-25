import { Order } from "../models/order.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getAllAvailableOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({walkerID: req.user._id, status: { $in: ["pending", "accepted", "walking"] }}).populate("userID", "name phoneNo");

    if(!orders){
        throw new apiError(500, "Something went wrong while fetching available orders");
    }
    return res
    .status(200)
    .json(
        new apiResponse(200, orders, "Available orders fetched successfully")
    )
})