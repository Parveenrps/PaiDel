import { apiError } from '../utils/apiError.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';
import {OTP} from '../models/otp.model.js';
import bcrypt from 'bcrypt';
import { apiResponse } from '../utils/apiResponse.js';

const generarteAccessAndRefreshToken = async(userId) => {
    try {
        console.log("Generating access and refresh token for userId: ", userId);
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        try {
            await user.save({validateBeforeSave: true});
        } catch (error) {
            throw new apiError(500, "Something went wrong while saving the user", [error.message], error.stack);
        }

        return { accessToken, refreshToken };

    } catch (error) {
        throw new apiError(500, "Something when wrong while generating access and refresh token", [error.message], error.stack);
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, phoneNo } = req.body;

    if([name, email, password, role, phoneNo].some( (field) => field?.trim() === "")){
        throw new apiError(400, "All fields are required");
    }

    if(!email.includes("@")){
        throw new apiError(400, "Please enter a valid email address");
    }

    const existingUser = await User.findOne({
        $or: [{email}, {phoneNo}]
    })

    if(existingUser){
        throw new apiError(400, "User already exists");
    }

    const newUser = await User.create({
        name,
        email,
        password: password,
        role,
        phoneNo
    })

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
        userId: newUser._id,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    })

    console.log(`OTP for user ${newUser._id} is ${otp}`);

    const {accessToken, refreshToken} = await generarteAccessAndRefreshToken(newUser._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(201).json(
        new apiResponse(201, {isOTPVerified: newUser.isOTPVerified, otp}, "User registered successfully, Please verify OTP")
    );
});

const verifyOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const userId = req.user._id;

    if(!otp || otp.trim() === ""){
        throw new apiError(400, "OTP is required");
    }

    const record = await OTP.findOne({ userId, otp });

    if(!record){
        throw new apiError(400, "Invalid OTP");
    }

    if(record.expiresAt < new Date()){
        throw new apiError(400, "OTP has expired");
    }

    const user = await User.findById(userId).select("-password -refreshToken");

    user.isOTPVerified = true;

    await user.save();
    await OTP.deleteOne({ _id: record._id });

    const {accessToken, refreshToken} = await generarteAccessAndRefreshToken(userId);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new apiResponse(200, user, "OTP verified successfully")
    );
});

const loginUser = asyncHandler(async(req, res) =>{
    const { phoneNo, password } = req.body;

    if([phoneNo, password].some( (field) => field?.trim() === "")){
        throw new apiError(400, "All fields are required");
    }

    const user = await User.findOne({ phoneNo });

    if(!user){
        throw new apiError(400, "Invalid User, Please check your phone number");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new apiError(400, "Invalid password");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
        userId: user._id,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    })

    console.log(`OTP for user ${user._id} is ${otp}`);

    const {accessToken, refreshToken} = await generarteAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(201).json(
        new apiResponse(201, {isOTPVerified: user.isOTPVerified, otp}, "User registered successfully, Please verify OTP")
    );

})

const logoutUser = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, { $unset : {refreshToken: 1}}, {new: true});

    if(!user){
        throw new apiError(400, "User not found");
    }
    user.isOTPVerified = false;
    await user.save();
    
    const options = {
        httpOnly: true,
        secure: true
    }   

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new apiResponse(200, {}, "Logged out successfully")
    );
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.headers.authorization?.split(" ")[1];

    if(!refreshToken){
        throw new apiError(401, "Unauthorized, Please provide a valid refresh token");
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded?.id);

        if(!user){
            throw new apiError(401, "Unauthorized, User not found");
        }

        if(user.refreshToken !== refreshToken){
            throw new apiError(401, "Unauthorized, Invalid refresh token");
        }

        const {accessToken, newRefreshToken} = await generarteAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .status(200)
        .json(
            new apiResponse(200, {accessToken, refreshToken: newRefreshToken}, "Access token refreshed successfully")
        );
    } catch (error) {
        throw new apiError(401, "Unauthorized, Invalid or expired refresh token");
    }
})

const getCurrentUser = asyncHandler( async(req, res)=>{
    const user = await User.findById(req.user._id);

    if(!user){
        throw new apiError(400, "user not found")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, user, "User fetched successfully")
    )
})

export {
    registerUser,
    verifyOTP,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
};