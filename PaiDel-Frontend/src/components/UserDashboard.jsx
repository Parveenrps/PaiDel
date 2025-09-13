import React from "react";
import { Link, Outlet, Navigate } from "react-router-dom";

const UserDashboard = () => {
  const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));

  // Redirect if user is not logged in
  if (!userLoggedIn) return <Navigate to="/signin" />;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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

        {/* Sidebar Links */}
        <Link to="dashboard" className="block py-2 hover:text-blue-400">Dashboard</Link>
        <Link to="orders" className="block py-2 hover:text-blue-400">Orders</Link>
        <Link to="settings" className="block py-2 hover:text-blue-400">Settings</Link>
        <Link to="logout" className="block py-2 hover:text-blue-400">Logout</Link>
      </div>

      {/* Right content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {/* Nested pages will render here */}
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
