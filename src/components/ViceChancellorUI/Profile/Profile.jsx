import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { FaArrowLeft, FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";

const fetchProfile = async () => {
  const response = await apiRequestAxios({ url: 'http://134.209.144.96:8081/profile/', method: 'GET' });
  return response.data;
};
const fetchBankDetails = async () => {
  const response = await apiRequestAxios({ url: 'http://134.209.144.96:8081/profile/bank_details', method: 'GET' });
  return response.data;
};


const Profile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || null);

  const [userData, setUserData] = useState(null);

  React.useEffect(() => {
    if (data) setUserData(data);
  }, [data]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load profile.</div>;
  if (!userData) return null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => window.history.back()} className="text-gray-700">
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 relative">
        <div className="relative">
          <img
            src={profilePic || userData.picture || "https://via.placeholder.com/150"}
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
            {userData.designation?.join(", ") || "No Designation"} at {userData.campus?.name || "Unknown Campus"}
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
          {["name", "email", "gender", "dob"].map((field) => (
            <div key={field} className="mb-2">
              <label className="text-gray-700 font-semibold capitalize">{field.replace(/_/g, " ")}</label>
              <input
                type="text"
                name={field}
                value={userData[field] || ""}
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

      {/* Work Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold flex justify-between">
          Work Information
          <FaEdit className="text-blue-500 cursor-pointer" onClick={() => setIsEditing(!isEditing)} />
        </h3>
        <div className="mt-2">
          {["date_of_joining", "staff_type"].map((field) => (
            <div key={field} className="mb-2">
              <label className="text-gray-700 font-semibold capitalize">{field.replace(/_/g, " ")}</label>
              <input
                type="text"
                name={field}
                value={userData[field] || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded ${
                  isEditing ? "bg-white border-gray-400" : "bg-gray-100"
                }`}
              />
            </div>
          ))}
          <div className="mb-2">
            <label className="text-gray-700 font-semibold">Campus</label>
            <input
              type="text"
              value={userData.campus?.name || ""}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold">Bank Details</h3>
        {userData.bank_detail ? (
          <>
            <p className="text-gray-700"><strong>Account Number:</strong> {userData.bank_detail.account_number}</p>
            <p className="text-gray-700"><strong>IFSC:</strong> {userData.bank_detail.ifsc}</p>
            <p className="text-gray-700"><strong>Bank Name:</strong> {userData.bank_detail.bank_name}</p>
            <p className="text-gray-700"><strong>Branch:</strong> {userData.bank_detail.branch}</p>
          </>
        ) : (
          <p className="text-gray-500 italic">Bank details not provided.</p>
        )}
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
