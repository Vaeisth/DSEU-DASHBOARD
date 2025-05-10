import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFilter, FaUpload, FaEllipsisH, FaCalendarAlt, FaUserAlt, FaUser } from "react-icons/fa";
import { apiRequest } from '../../../utils/api';

const Announcements = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        const response = await apiRequest("http://134.209.144.96:8081/superadmin/get-all-announcements", {
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

  const handleFileUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, file: fileUrl } : item
        )
      );
    }
  };

  const filters = [
    { id: 'all', label: 'All Announcements' },
    { id: 'employee', label: 'Employee' },
    { id: 'admin', label: 'Admin' }
  ];

  const filteredAnnouncements = activeFilter === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.audience === activeFilter);

  const renderProfileImage = (item) => {
    if (!item.profileImage) {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <FaUser className="text-gray-400" size={20} />
        </div>
      );
    }

    return (
      <img
        src={item.profileImage}
        alt={item.facultyName || "User"}
        className="w-10 h-10 rounded-full object-cover border border-gray-200"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
          `;
        }}
      />
    );
  };

  const renderFilePreview = (item) => {
    if (!item.file) return null;

    if (item.file.endsWith(".pdf") || item.file.endsWith(".docx")) {
      return (
        <a
          href={item.file}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 underline"
        >
          View File
        </a>
      );
    }

    return (
      <img
        src={item.file}
        alt="Uploaded"
        className="w-10 h-10 rounded-lg object-cover border"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
        }}
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Announcements</h1>
          </div>
          <button
            onClick={() => navigate("/post")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Create Post
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 px-4 pb-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaCalendarAlt className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
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
                <p className="text-sm text-gray-600">Employee Posts</p>
                <p className="text-xl font-semibold text-gray-900">
                  {announcements.filter(a => a.audience === 'employee').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FaFilter className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admin Posts</p>
                <p className="text-xl font-semibold text-gray-900">
                  {announcements.filter(a => a.audience === 'admin').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {renderProfileImage(item)}
                    <div>
                      <p className="font-medium text-gray-900">{item.facultyName || "Anonymous"}</p>
                      <p className="text-sm text-gray-500">{item.designation || "No designation"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{item.timeAgo || "Just now"}</span>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <FaEllipsisH className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.description}
                  <button className="text-blue-600 hover:text-blue-700 ml-1">Read more</button>
                </p>

                {/* File Section */}
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer flex items-center gap-2 bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                    <FaUpload size={14} />
                    <span>{item.file ? "Change File" : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*, .pdf, .docx"
                      onChange={(e) => handleFileUpload(e, item.id)}
                      className="hidden"
                    />
                  </label>

                  {renderFilePreview(item)}
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
