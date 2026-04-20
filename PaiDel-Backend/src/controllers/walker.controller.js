import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const allAvailableWalkers = asyncHandler(async(req, res) => {
    const walkers = await User.find({role: "walker"});

    return res
    .status(200)
    .json(
        new apiResponse(200, walkers, "Walkers fetched successfully")
    )
})