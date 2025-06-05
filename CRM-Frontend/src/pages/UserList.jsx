import React, { useState } from "react";
import { TiUserAddOutline } from "react-icons/ti";
import { LiaUserEditSolid, LiaUserTimesSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

// Mock user data
const mockUsers = [
  {
    userID: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    designation: "Developer",
    department: "Engineering",
    phoneNumber: "1234567890",
    profilePicUrl: "",
    active: true,
  },
  {
    userID: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    designation: "Manager",
    department: "Sales",
    phoneNumber: "0987654321",
    profilePicUrl: "",
    active: true,
  },
];

const UserList = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUserID, setEditingUserID] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
  });

  const navigate = useNavigate();

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : users;

const removeUser = async (userID) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, deactivate!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    setUsers((prev) =>
      prev.filter((user) => Number(user.userID) !== Number(userID))
    );
    Swal.fire("Deactivated!", "User has been removed.", "success");
  }
};


  const openEditModal = (user) => {
    setEditingUserID(user.userID);
    setEditFormData({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phoneNumber,
      userType: user.designation,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Confirm Edit",
      text: "Are you sure you want to save changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userID === editingUserID
            ? {
                ...user,
                firstName: editFormData.name,
                lastName: "",
                email: editFormData.email,
                phoneNumber: editFormData.phone,
                designation: editFormData.userType,
              }
            : user
        )
      );
      setIsEditModalOpen(false);
      Swal.fire("Saved!", "User information has been updated.", "success");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Topbar />
      <div className="flex">
        <div className="w-64">
          <Sidebar />
        </div>

        {/* Main content with conditional blur */}
        <div className={`flex-1 p-6 mt-18 transition-all duration-300 ${isEditModalOpen ? "blur-sm" : ""}`}>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => navigate("/add-user")}
              className="flex items-center gap-1 px-6 font-semibold py-3 bg-[#101d3f] text-white rounded-lg"
            >
              Add User <TiUserAddOutline size={20} />
            </button>

            <input
              type="text"
              placeholder="Search users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-gray-300 text-gray-900 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Designation</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.userID} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 flex items-center gap-3">
                    <img
  src={user.profilePicUrl || "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"}
  alt="Profile"
  className="w-10 h-10 rounded-full object-cover"
/>

                      <div>
                        <div className="font-semibold">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">{user.designation}</td>
                    <td className="px-4 py-2">{user.department}</td>
                    <td className="px-4 py-2">{user.phoneNumber}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => openEditModal(user)}
                      >
                        <LiaUserEditSolid className="inline mr-1" />
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => removeUser(user.userID)}
                      >
                        <LiaUserTimesSolid className="inline mr-1" />
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal - positioned above content without dark overlay */}
        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 transition-all">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] space-y-4">
              <h2 className="text-xl font-bold text-center">Edit User</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">User Type</label>
                  <select
                    name="userType"
                    value={editFormData.userType}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  >
                    <option value="">Select User Type</option>
                    <option value="Admin">Admin</option>
                    <option value="Customer">Customer</option>
                    <option value="Sales Rep">Sales Rep</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
