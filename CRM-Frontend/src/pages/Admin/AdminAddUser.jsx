import React, { useState } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";

const AdminAddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    designation: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted user:", formData);
    // You can send this data to your backend later
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />
      <div className="flex">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex-1 p-6 mt-16">
          <h1 className="text-xl font-semibold mb-6">Add New User</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md max-w-xl space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-[#101d3f] text-white px-4 py-2 rounded hover:bg-[#1f2a4c]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddUser;
