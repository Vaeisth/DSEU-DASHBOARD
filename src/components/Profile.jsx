import React, { useState } from "react";
import { FaArrowLeft, FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);
  const [userData, setUserData] = useState({
    name: "David Joe",
    email: "VG@dseu.in",
    employeeId: "524657801",
    shift: "8:30 AM - 5:30 PM",
    joiningDate: "Mar 24, 2020",
    campus: "DSEU Pusa Campus-1",
    department: "Computer Science",
    designation: "Assistant Professor",
    about: "Delhi Skill and Entrepreneurship University (DSEU) focuses on skilling and vocational training.",
    address: "Integrated Institute of Technology Complex, Sector 9, Dwarka, New Delhi, 110077",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle Profile Picture Change
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => window.history.back()} className="text-gray-700">
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 relative">
        <div className="relative">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer">
            <FaCamera className="text-white" />
          </label>
          <input type="file" id="profile-upload" accept="image/*" onChange={handleProfileChange} className="hidden" />
        </div>
        <div>
          <h3 className="text-lg font-bold">{userData.name}</h3>
          <p className="text-gray-600 text-sm">
            {userData.designation} at {userData.campus}
          </p>
          <a href={`mailto:${userData.email}`} className="text-blue-500 text-sm">
            {userData.email}
          </a>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold flex justify-between">
          Basic Info
          <FaEdit className="text-blue-500 cursor-pointer" onClick={() => setIsEditing(!isEditing)} />
        </h3>
        <div className="mt-2">
          {["name", "email", "employeeId", "shift"].map((field) => (
            <div key={field} className="mb-2">
              <label className="text-gray-700 font-semibold">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                name={field}
                value={userData[field]}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded ${
                  isEditing ? "bg-white border-gray-400" : "bg-gray-100"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold flex justify-between">
          Work Information
          <FaEdit className="text-blue-500 cursor-pointer" onClick={() => setIsEditing(!isEditing)} />
        </h3>
        <div className="mt-2">
          {["joiningDate", "campus", "department", "designation"].map((field) => (
            <div key={field} className="mb-2">
              <label className="text-gray-700 font-semibold">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                name={field}
                value={userData[field]}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded ${
                  isEditing ? "bg-white border-gray-400" : "bg-gray-100"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* About Organization */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold flex justify-between">
          About Organization
          <FaEdit className="text-blue-500 cursor-pointer" onClick={() => setIsEditing(!isEditing)} />
        </h3>
        <textarea
          name="about"
          value={userData.about}
          onChange={handleChange}
          disabled={!isEditing}
          className={`w-full p-2 border rounded ${
            isEditing ? "bg-white border-gray-400" : "bg-gray-100"
          }`}
          rows="4"
        ></textarea>
        <p className="text-gray-700 mt-2">
          <strong>Address:</strong>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border rounded ${
              isEditing ? "bg-white border-gray-400" : "bg-gray-100"
            }`}
          />
        </p>
      </div>

      {/* Save & Cancel Buttons */}
      {isEditing && (
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setIsEditing(false)}
          >
            <FaSave className="mr-2" /> Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => setIsEditing(false)}
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
