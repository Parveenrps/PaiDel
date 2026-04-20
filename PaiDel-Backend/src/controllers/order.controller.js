import { Order } from "../models/order.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createOrder = asyncHandler(async(req, res) => {
    const {item, pickupAddress, dropAddress, walker} = req.body;

    if([item, pickupAddress, dropAddress, walker].some( (field) => field?.trim() === "")){
        throw new apiError(400, "All fields are required");
    }

    const order = await Order.create({
        item,
        pickupAddress,
        dropAddress,
        walker: walker._id,
        user: req.user.id
    })

    if(!order){
        throw new apiError(500, "Something went wrong while creating the order");
    }

    return res
    .status(201)
    .json(
        new apiResponse(201, order, "Order created successfully")
    )
});

export const getAllOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.user._id})

    return res
    .status(200)
    .json(
        new apiResponse(200, orders, "Orders fetched successfully")
    )
})