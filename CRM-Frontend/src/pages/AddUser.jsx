import React, { useEffect, useState } from "react";
//import SideNavigationAdmin from "../../components/Admin/SideNavigationAdmin";
//import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin";
import { useNavigate, useParams } from "react-router-dom";

const AddUser = () => {
  const [open, setOpen] = useState(true);
  const { userID } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    designation: '',
    department: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated edit flow — just pre-fills dummy data
    if (userID) {
      setFormData({
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        designation: 'Developer',
        department: 'Engineering',
        profileImage: null,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        designation: '',
        department: '',
        profileImage: null,
      });
    }
  }, [userID]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        profileImage: 'Profile image size should not exceed 2MB',
      }));
    } else {
      setFormData({
        ...formData,
        profileImage: file,
      });
      setErrors((prev) => ({ ...prev, profileImage: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required!';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required!';
      valid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required!';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required!';
      valid = false;
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required!';
      valid = false;
    }

    if (formData.profileImage && formData.profileImage.size > 2 * 1024 * 1024) {
      newErrors.profileImage = 'Profile image size should not exceed 2MB';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log('Form Submitted:', formData);
    alert(`${userID ? 'User updated' : 'User added'} successfully!`);
    navigate('/admin/userlist');
  };

  const pageTitle = () => (
    <div className="flex flex-row gap-3 pt-2 items-centered ml-5">
      <h1 className="text-4xl leading-relaxed py-4 font-bold text-left text-[#001b5e]">
        {userID ? 'Edit User' : 'Add User'}
      </h1>
    </div>
  );

  return (
    <div>
      <TopNavigationAdmin />
      <section className="flex">
        <SideNavigationAdmin open={open} setOpen={setOpen} />
        <div className="relative bg-zinc-100 h-fit w-screen p-5">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {pageTitle()}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-medium">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.designation && <p className="text-red-500">{errors.designation}</p>}
              </div>

              <div>
                <label className="block font-medium">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
                {errors.profileImage && <p className="text-red-500">{errors.profileImage}</p>}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {userID ? 'Update User' : 'Add User'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/userlist')}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddUser;
