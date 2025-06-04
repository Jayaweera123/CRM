import React, { useState } from "react";
import { TiUserAddOutline } from "react-icons/ti";
import { LiaUserEditSolid, LiaUserTimesSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";




// Mock user data for frontend-only demo
const mockUsers = [
  {
    userID: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    designation: "Developer",
    department: "Engineering",
    phoneNumber: "123-456-7890",
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
    phoneNumber: "098-765-4321",
    profilePicUrl: "",
    active: true,
  },
];

const UserList = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");

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
      setUsers((prev) => prev.filter((user) => user.userID !== userID));
      Swal.fire("Deactivated!", "User has been deactivated.", "success");
    }
  };

  const navigate = useNavigate();



  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />
      <div className="flex">
        <div className="w-64">
          <Sidebar />
        </div>

        <div className="flex-1 p-6 mt-18">
          <div className="flex justify-between mb-4">
           <button
  onClick={() => navigate("/add-user")}
  className="flex items-center gap-1 px-6 font-semibold  py-3 bg-[#101d3f] text-white rounded-lg"
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
                        src={
                          user.profilePicUrl
                            ? user.profilePicUrl
                            : "https://via.placeholder.com/48"
                        }
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
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
  onClick={() => navigate(`/edit-user/${user.userID}`)}
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
      </div>
    </div>
  );
};

export default UserList;
