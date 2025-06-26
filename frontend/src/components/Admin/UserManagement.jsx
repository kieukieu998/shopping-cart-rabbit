import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser, deleteUser, fetchUsers, updateUser } from "../../redux/slices/adminSlice";

const UserManagement = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if( user && user.role === "admin") {
      dispatch(fetchUsers())
    }
  }, [dispatch, user]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "customer" // Default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.password]: e.target.value,
      [e.target.role]: e.target.value,
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));

    // Reset the form after submisses
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer"
    })
  };


  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      { loading && <p>Loading.....</p> }
      { error && <p>Error {Error}</p> }
      {/* Add new User Form  */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded p-2 outline-none" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded p-2 outline-none" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded p-2 outline-none" required />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">Role</label>
            <select name="role" id="role" onChange={handleChange} className="w-full border rounded p-2 outline-none">
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Add User</button>
        </form>
      </div>
      {/* User List  */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-center text-gray-500">
          <thead>
            <tr className="bg-gray-100 text-xs uppercase text-gray-700">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.length > 0 ? (
                users.map((user) => {
                  return (
                    <tr key={user._id} className="border-b hover:bg-gray-50 cursor-pointer">
                      <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                      <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.email}</td>
                      <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                        <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)} className="p-2 border rounded outline-none">
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                        <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent users found
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
