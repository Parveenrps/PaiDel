import api from "./axios"
export const getAllAvailableWalkers = () =>{
    return api.get("user/walkers?status=available")
}