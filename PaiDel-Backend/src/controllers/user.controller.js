import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";


export const getAllAvailableWalkers = asyncHandler(async(req, res) => {
    const availableWalkers = await User.find({role: "walker", status: "available"}).select("_id name");

    if(!availableWalkers){
        throw new apiError(500, "Something went wrong while fetching available walkers");
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, availableWalkers, "Available walkers fetched successfully")
    )

})