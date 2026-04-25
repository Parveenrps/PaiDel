import React, { useEffect, useState } from "react";
import { getAllAvailableOrders, updateOrderStatus } from "../../services/userService.js";

const Walker = () => {
  const [availableOrders, setAvailableOrders] = useState([]);

  const fetchAllAvailableOrders = async () => {
    try {
      const availableOrders = await getAllAvailableOrders();
      setAvailableOrders(availableOrders.data.data);
      console.log(availableOrders.data.data);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message,
      );
    }
  };

  const handleOrderStatus = async (orderID, status) => {
    try {
      const res = await updateOrderStatus(orderID, status);
      console.log("Order status updated successfully:", res.data);
      fetchAllAvailableOrders();
    } catch (error) {
      console.log(
        "Error updating order status:",
        error.response?.data || error.message,
      );
    }
  } 
    

  useEffect(() => {
    fetchAllAvailableOrders();
  }, []);

  return (
    <div className="text-xl font-bold flex justify-center items-center h-screen">
      hello ji, This is walker dashboard
      <div>
        {availableOrders.map((order) => (
          <div key={order._id} className="border p-1 mb-4">
            <div className="flex flex-col">
              <p>
                <span className="font-semibold">Order ID:</span> {order.id}
              </p>
              <p>
                <span className="font-semibold">Item:</span> {order.item}
              </p>

              <p>
                <span className="font-semibold">Item:</span> {order.userID.name}
              </p>
              <p>
                <span className="font-semibold">Item:</span> {order.userID.phoneNo}
              </p>

              <p>
                <span className="font-semibold">From:</span>{" "}
                {order.pickupAddress}
              </p>
              <p>
                <span className="font-semibold">To:</span> {order.dropAddress}
              </p>

              {
                order.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOrderStatus(order._id, "accepted")}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleOrderStatus(order._id, "cancelled")}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )
              }

              {
                order.status === "accepted" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOrderStatus(order._id, "walking")}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Walking
                    </button>
                  </div>
                )
              }

              {
                order.status === "walking" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOrderStatus(order._id, "completed")}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Complete
                    </button>
                  </div>
                )
              }

            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Walker;
