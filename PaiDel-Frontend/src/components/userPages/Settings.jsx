import React from "react";

const Settings = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-xl font-semibold mb-4">Settings</h3>
    <div className="space-y-3">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Change Password</button>
      <button className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete Account</button>
    </div>
  </div>
);

export default Settings;
