import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaCalendarAlt, FaUserAlt, FaBuilding } from "react-icons/fa";
import { apiRequest } from '../../../utils/api';
import { API_ENDPOINTS } from '../../../config/api.config';

const Announcements = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await apiRequest(API_ENDPOINTS.ALL_ANNOUNCEMENTS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }

        const data = await response.json();
        setAnnouncements(data.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Announcements</h2>
            <button 
              onClick={() => navigate('/post')}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaUpload className="mr-2" />
              Post Announcement
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaCalendarAlt className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Announcements</p>
                <p className="text-xl font-semibold text-gray-900">{announcements.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <FaUserAlt className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Announced By</p>
                <p className="text-xl font-semibold text-gray-900">
                  {announcements[0]?.announcement_by?.name || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FaBuilding className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Campus</p>
                <p className="text-xl font-semibold text-gray-900">
                  {announcements[0]?.announcement_by?.campus?.name || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={announcement.announcement_by?.picture || "https://via.placeholder.com/50"}
                      alt={announcement.announcement_by?.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{announcement.announcement_by?.name}</p>
                      <p className="text-sm text-gray-500">{announcement.announcement_by?.designation?.join(", ")}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(announcement.announcement_date)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                <p className="text-gray-600 mb-4">{announcement.description}</p>

                {/* Additional Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaBuilding className="mr-1" />
                    <span>{announcement.announcement_by?.campus?.name}</span>
                  </div>
                  {announcement.link && (
                    <a 
                      href={announcement.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View Link
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
