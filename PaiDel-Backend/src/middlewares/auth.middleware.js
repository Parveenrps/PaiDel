import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

export const verifyToken = asyncHandler(async(req, res, next) =>{
    const token  =  req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if(!token){
        throw new apiError(401, "unauthorized, Please provide a valid token");
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        
        const user = await User.findById(decoded?.id).select("-password -refreshToken");
        
        if(!user){
            throw new apiError(401, "Unauthorized, User not found");
        }
        req.user = user;
        next();
    } catch(error){
        throw new apiError(401, "Unauthorized, Invalid or expired token");
    }

})