import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    navigate("/signin");
  };

  return (
    <div className="bg-white text-center p-6 rounded-lg shadow">
      <p className="text-xl font-semibold mb-4">Do you want to logout?</p>
      <button onClick={handleLogout} className="px-4 py-2 bg-gray-600 text-white rounded-lg">
        Logout
      </button>
    </div>
  );
};

export default Logout;
