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

    const hashedPasword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPasword,
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

    return res.status(201).json(
        new apiResponse(201, {userId: newUser._id, otp: otp}, "User registered successfully, Please verify your email to login")
    );
});

const verifyOTP = asyncHandler(async (req, res) => {
    const { userId, otp } = req.body;
    
    const record = await OTP.findOne({ userId, otp });

    if(!record){
        throw new apiError(400, "Invalid OTP");
    }

    if(record.expiresAt < new Date()){
        throw new apiError(400, "OTP has expired");
    }

    const user = await User.findById(userId);
    user.isVerified = true;
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
        new apiResponse(200, userId, "OTP verified successfully")
    );
});

// const loginUser = asyncHandler(async (req, res) => {
//     res.status(200).json({message: "User logged in successfully"});
// });

// const logoutUser = asyncHandler(async (req, res) => {
//     res.status(200).json({message: "User logged out successfully"});
// });

export {
    registerUser,
    verifyOTP,
};