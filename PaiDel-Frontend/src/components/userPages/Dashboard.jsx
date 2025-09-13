import React from "react";

const Dashboard = ({ user }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">
        Hey {user?.name}, this is your dashboard
      </h2>
      <p className="text-gray-600 mt-2">Welcome back! Here is an overview of your account.</p>
    </div>
  );
};

export default Dashboard;
