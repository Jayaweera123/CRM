import React from "react";

const Topbar = () => {
  return (
    <div
      className="fixed top-0 left-64 right-0 bg-white shadow flex items-center justify-between px-6 z-50"
      style={{ height: "1.5cm" }}
    >
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <div className="text-indigo-900 font-bold">Soff Cricketet</div>
    </div>
  );
};

export default Topbar;
