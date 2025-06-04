import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.userType.trim()) {
      newErrors.userType = "User type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitted user:", formData);
      // send to backend here
    }
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to cancel?",
      text: "All unsaved changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, stay here",
    });

    if (result.isConfirmed) {
      navigate("/user-list");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />
      <div className="flex">
        <div className="w-64">
          <Sidebar />
        </div>

        <h1 className="text-xl font-semibold mb-6">Add New User</h1>

        <div className="flex-1 flex justify-center items-start p-6 mt-24 mr-40">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-[600px] min-h-[500px] space-y-5"
          >
            <h2 className="text-3xl flex-1 flex justify-center mt-6 font-bold text-[#101d3f] mb-6">
              Add User Form
            </h2>

            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email */}
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
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* User Type Dropdown */}
            <div>
              <label className="block mb-1 font-medium">User Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Select User Type</option>
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
                <option value="Sales Rep">Sales Rep</option>
              </select>
              {errors.userType && (
                <p className="text-red-500 text-sm">{errors.userType}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-12 space-x-4">
              <button
                type="submit"
                className="bg-[#101d3f] text-white px-8 py-3 font-semibold rounded hover:bg-[#1f2a4c]"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-8 py-3 font-semibold rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
