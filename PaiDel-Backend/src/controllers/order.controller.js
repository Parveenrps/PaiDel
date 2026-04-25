import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createOrder = asyncHandler(async(req, res) => {
    const {item, pickupAddress, dropAddress, walkerID} = req.body;

    if([item, pickupAddress, dropAddress, walkerID].some( (field) => field?.trim() === "")){
        throw new apiError(400, "All fields are required");
    }

    const order = await Order.create({
        item,
        pickupAddress,
        dropAddress,
        walkerID,
        userID: req.user.id
    })

    if(!order){
        throw new apiError(500, "Something went wrong while creating the order");
    }
    await User.findByIdAndUpdate(walkerID, {status: "busy"}) // Set walker status to busy when an order is assigned

    return res
    .status(201)
    .json(
        new apiResponse(201, order, "Order created successfully")
    )
});

export const getAllOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({userID: req.user._id}).populate("walkerID", "name phoneNo");
    
    return res
    .status(200)
    .json(
        new apiResponse(200, orders, "Orders fetched successfully")
    )
})

export const updateOrderStatus = asyncHandler(async(req, res) => {
    const {orderID} = req.params;
    const {status} = req.query;

    if(!["pending", "accepted", "walking", "completed", "cancelled"].includes(status)){
        throw new apiError(400, "Invalid status value");
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderID, {status}, {new: true});

    if(!updatedOrder){
        throw new apiError(404, "Order not found");
    }

    if(["completed", "cancelled"].includes(status)){
        await User.findByIdAndUpdate(updatedOrder.walkerID, {status: "available"});
    }
    
    return res
    .status(200)
    .json(
        new apiResponse(200, updatedOrder, "Order status updated successfully")
    )
})

