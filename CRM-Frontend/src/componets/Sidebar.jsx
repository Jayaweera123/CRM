import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#101d3f] text-white fixed">
      <div className="text-2xl font-bold p-6 border-b border-indigo-700">
        CRM Panel
      </div>
      <nav className="mt-6 space-y-2 px-4">
        <Link to="/dashboard" className="block p-3 rounded hover:bg-indigo-700">Dashboard</Link>
        <Link to="/add-user" className="block p-3 rounded hover:bg-indigo-700">Add User</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
