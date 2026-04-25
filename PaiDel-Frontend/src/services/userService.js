import api from "./axios"

export const getAllAvailableWalkers = () =>{
    return api.get("user/available-walkers")
}

export const getAllOrders = () => {
    return api.get("/orders")
}

export const placeOrder = (orderData) =>{
    return api.post("/orders", orderData);
}

export const getAllAvailableOrders = () =>{
    return api.get("/walker/available-orders")
}

export const updateOrderStatus = (orderID, status) =>{
    return api.patch(`/orders/${orderID}?status=${status}`);
}