import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaUniversity, FaCalendarAlt, FaUserTie, FaBuilding } from "react-icons/fa";

const fetchProfile = async () => {
  const response = await apiRequestAxios({ url: 'http://134.209.144.96:8081/profile/', method: 'GET' });
  return response.data;
};

const Profile = () => {
  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-600">Loading profile information...</p>
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Profile</h3>
        <p className="text-gray-600">Please try again later or contact support if the problem persists.</p>
      </div>
    </div>
  );
  
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Profile</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
              <div className="px-6 pb-6">
                <div className="flex justify-center">
                  <div className="relative -mt-16">
                    <img
                      src={userData.picture || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                  <p className="text-gray-600 mt-1">{userData.designation?.join(", ") || "No Designation"}</p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-center text-gray-600">
                      <FaUniversity className="mr-2" />
                      <span>{userData.campus?.name || "Unknown Campus"}</span>
                    </div>
                    <div className="flex items-center justify-center text-gray-600">
                      <FaUserTie className="mr-2" />
                      <span className="capitalize">{userData.staff_type || "Not specified"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-sm mt-8 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="w-5 h-5 mr-3 text-blue-500" />
                  <a href={`mailto:${userData.email}`} className="hover:text-blue-600 transition-colors">
                    {userData.email}
                  </a>
                </div>
                {userData.phone && (
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{userData.phone}</span>
                  </div>
                )}
                {userData.address && (
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{userData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Information Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaIdCard className="mr-2 text-blue-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Full Name</label>
                  <p className="text-gray-800 font-medium">{userData.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Gender</label>
                  <p className="text-gray-800 font-medium capitalize">{userData.gender || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Date of Birth</label>
                  <p className="text-gray-800 font-medium">{userData.dob || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Email</label>
                  <p className="text-gray-800 font-medium">{userData.email}</p>
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaBuilding className="mr-2 text-blue-500" />
                Work Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Date of Joining</label>
                  <p className="text-gray-800 font-medium">{userData.date_of_joining || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Staff Type</label>
                  <p className="text-gray-800 font-medium capitalize">{userData.staff_type || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Campus</label>
                  <p className="text-gray-800 font-medium">{userData.campus?.name || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Designation</label>
                  <p className="text-gray-800 font-medium">{userData.designation?.join(", ") || "Not specified"}</p>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                Bank Details
              </h3>
              {userData.bank_detail ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Account Number</label>
                    <p className="text-gray-800 font-medium">{userData.bank_detail.account_number}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">IFSC Code</label>
                    <p className="text-gray-800 font-medium">{userData.bank_detail.ifsc}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Bank Name</label>
                    <p className="text-gray-800 font-medium">{userData.bank_detail.bank_name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">Branch</label>
                    <p className="text-gray-800 font-medium">{userData.bank_detail.branch}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">Bank details not provided</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
