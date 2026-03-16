import api from "./axios";

export const registerUser = (data) => {
    return api.post("auth/register", data)
}

export const verifyOTP = (data) => {
    return api.post("auth/verify-otp", data)
}

