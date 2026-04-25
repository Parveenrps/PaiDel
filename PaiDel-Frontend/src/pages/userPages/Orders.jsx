import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getAllAvailableWalkers, getAllOrders, placeOrder, updateOrderStatus } from "../../services/userService.js";
import { useEffect } from "react";
import socket from "../../services/socket.js";


const Orders = () => {
  const [activeTab, setActiveTab] = useState("place");
  const [walkers, setWalkers] = useState([]);
  const [placeNewOrder, setPlaceNewOrder] = useState({item: "", pickupAddress: "", dropAddress: "", walkerID: ""});
  const [orders, setOrders] = useState([]);

  const handleChange = (e)=>{
    e.preventDefault();
    setPlaceNewOrder( (prev) => ({
      ...prev, [e.target.name] : e.target.value
    }))
  }

  const handlePlaceNewOrder = async ()=>{
    socket.on("connect", ()=>{
      console.log("Connected to Socket.IO server with ID:", socket.id);
    })
    try {
      const res = await placeOrder(placeNewOrder);
      setPlaceNewOrder({item: "", pickupAddress: "", dropAddress: "", walkerID: ""});
      fetchAllOrders();
    } catch (error) {
      console.log("Error placing order:", error.response?.data || error.message);
    }
  }

  const fetchAllAvailableWalkers = async()=>{
    try {
      const availableWalkers = await getAllAvailableWalkers();
      setWalkers(availableWalkers.data.data);
    } catch (error) {
      console.error("Error fetching walkers:", error.response?.data || error.message);
    }
  }
  const fetchAllOrders = async()=>{
    try {
      const orders = await getAllOrders();
      setOrders(orders.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
    }
  }

  useEffect(()=>{
    fetchAllAvailableWalkers();
    fetchAllOrders();
  }, []);

  const handleCancelOrder = async(orderID) => {
    try {
      const res = await updateOrderStatus(orderID, "cancelled");
      fetchAllOrders();
    } catch (error) {
      console.log("Error cancelling order:", error.response?.data || error.message);
    }
  }

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "place" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("place")}
        >
          Place Order
        </button>

        <button
          className={`px-4 py-2 rounded ${
            activeTab === "ongoing" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("ongoing")}
        >
          PaiDeling
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "delivered" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("delivered")}
        >
          Delivered
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "cancelled" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </button>
        
      </div>

      {activeTab === "place" && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold mb-4">Place a New Order</h2>
          <input
            name="item"
            type="text"
            placeholder="Item"
            value={placeNewOrder.item}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            name="pickupAddress"
            type="text"
            placeholder="Pick Address"
            value={placeNewOrder.pickupAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            name="dropAddress"
            type="text"
            placeholder="Drop to"
            value={placeNewOrder.dropAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
          
          <select
            name="walkerID"
            value={placeNewOrder.walkerID}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="">Select Walker</option>
            {walkers.map((w) => (
              <option key={w._id} value={w._id}>
                {w.name}
              </option>
            ))}
          </select>

          <button
            onClick={handlePlaceNewOrder}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Place Order
          </button>
        </div>
      )}

      <div>
        All Orders
        <div>
          {orders.map((order) => (
            <div key={order._id} className="border p-1 mb-4">
              <div className="flex flex-col">
                <p>
                  <span className="font-semibold">Order ID:</span> {order._id}
                </p>
                <p>
                  <span className="font-semibold">Item:</span> {order.item}
                </p>
                <p>
                  <span className="font-semibold">From:</span> {order.pickupAddress}
                </p>
                <p>
                  <span className="font-semibold">To:</span> {order.dropAddress}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {order.status}
                </p>
                <p>
                  <span className="font-semibold">Walker:</span> {order.walkerID.name}
                </p>
                {order.status !== "cancelled" && order.status !== "completed" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
