import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Logout from "./userPages/Logout";
import Orders from "./userPages/Orders";
import Settings from "./userPages/Settings";


const User = () => {
  const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn")) || { name: "Guest", email: "guest@example.com" };


  return (
    <div className="flex h-screen">
      <div className="bg-black w-[20%] text-white p-4">
        <div className="flex items-center mb-4">
          <div className="rounded-full bg-white w-12 h-12 flex justify-center items-center text-black font-bold text-lg">
            {userLoggedIn.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <p className="text-xl font-semibold">{userLoggedIn.name}</p>
            <p className="text-sm text-gray-300">{userLoggedIn.email}</p>
          </div>
        </div>

        <Link to="/user/orders" className="block py-2 hover:text-blue-400">Orders</Link>
        <Link to="/user/settings" className="block py-2 hover:text-blue-400">Settings</Link>
        <Link to="/user/logout" className="block py-2 hover:text-blue-400">Logout</Link>
      </div>

      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Routes>
          <Route index element={<Orders></Orders>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="logout" element={<Logout />}/>
        </Routes>
      </div>
    </div>
  );
};

export default User;
