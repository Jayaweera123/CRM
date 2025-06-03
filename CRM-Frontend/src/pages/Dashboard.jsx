import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
          <p>This is your CRM overview section.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
