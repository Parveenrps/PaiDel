import React, { useState } from "react";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("place");
  const [orders, setOrders] = useState([
    {
      id: "ORD123",
      item: "Groceries",
      date: "2025-09-17 10:00 AM",
      status: "ongoing",
      from: "Sector 5",
      to: "Sector 9",
      walker: "Ravi Kumar",
    },
    {
      id: "ORD124",
      item: "Medicine",
      date: "2025-09-16 02:30 PM",
      status: "delivered",
      from: "Sector 7",
      to: "Sector 12",
      walker: "Amit Singh",
    },
    {
      id: "ORD125",
      item: "Clothes",
      date: "2025-09-15 05:45 PM",
      status: "cancelled",
      from: "Sector 2",
      to: "Sector 8",
      walker: "Rahul Verma",
    },
  ]);

  const [newOrder, setNewOrder] = useState({
    item: "",
    from: "",
    to: "",
    walker: "",
  });

  const walkers = [
    { id: "W1", name: "Ravi Kumar" },
    { id: "W2", name: "Amit Singh" },
    { id: "W3", name: "Rahul Verma" },
    { id: "W4", name: "Sandeep" },
  ];

  const handleNewOrder = (e)=>{
    const {name, value} = e.target;

    setNewOrder((prev)=>({...prev, [name] : value}))

  }

  const placeOrder =()=>{
    const newId = "ORD" + (Math.floor(Math.random()*100) + 120);
    const newOrderObj = {
      id: newId,
      item: newOrder.item,
      date: new Date().toLocaleString(),
      status: "ongoing",
      from: newOrder.from,
      to: newOrder.to,
      walker: newOrder.walker,

    }

    setOrders([...orders, newOrderObj]);
    setNewOrder({item: "", from: "", to: "", walker: ""});
    setActiveTab("ongoing");
  }

  const filteredOrders = orders.filter((order) => order.status === activeTab);

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
          On-going
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
            value={newOrder.item}
            onChange={handleNewOrder}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            name="from"
            type="text"
            placeholder="Pick from"
            value={newOrder.from}
            onChange={handleNewOrder}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            name="to"
            type="text"
            placeholder="Drop to"
            value={newOrder.to}
            onChange={handleNewOrder}
            className="w-full p-2 border rounded mb-3"
          />
          
          <select
            name="walker"
            value={newOrder.walker}
            onChange={handleNewOrder}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="">Select Walker</option>
            {walkers.map((w) => (
              <option key={w.id} value={w.name}>
                {w.name}
              </option>
            ))}
          </select>

          <button
            onClick={placeOrder}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Place Order
          </button>
        </div>
      )}

      {activeTab !== "place" && (
        <div className="grid gap-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 bg-white shadow rounded-lg flex flex-col"
              >
                <p>
                  <span className="font-semibold">Order ID:</span> {order.id}
                </p>
                <p>
                  <span className="font-semibold">Item:</span> {order.item}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {order.date}
                </p>
                <p>
                  <span className="font-semibold">From:</span> {order.from}
                </p>
                <p>
                  <span className="font-semibold">To:</span> {order.to}
                </p>
                <p>
                  <span className="font-semibold">Walker:</span> {order.walker}
                </p>
                <p>
                  <span className="font-semibold">Status: {order.status}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
