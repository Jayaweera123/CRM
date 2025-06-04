import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <Topbar />
      <div className="ml-64 mt-[1.5cm] p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
        <p>This is your CRM overview section.</p>
      </div>
    </>
  );
};

export default Dashboard;
