import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

const announcements = [
  {
    id: 1,
    facultyName: "Faculty name",
    designation: "Designation name",
    title: "B.Tech Admission Open for Session 2024–25",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    timeAgo: "2 days ago",
    file: "Prospectus.pdf",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    facultyName: "Faculty name",
    designation: "Designation name",
    title: "Faculty Event Announcement 2024",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    timeAgo: "2 days ago",
    file: "EventDetails.pdf",
    profileImage: "https://via.placeholder.com/50",
  },
];

const AnnouncementDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const announcement = announcements.find((item) => item.id === parseInt(id));

  if (!announcement) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">Announcement not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-8">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Announcement Details</h2>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={announcement.profileImage}
            alt="Faculty"
            className="w-14 h-14 rounded-full border border-gray-300 shadow"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">{announcement.facultyName}</p>
            <p className="text-sm text-gray-500">{announcement.designation}</p>
            <p className="text-xs text-gray-400">{announcement.timeAgo}</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{announcement.title}</h1>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed">{announcement.content}</p>

        {/* File */}
        <a
          href="#"
          className="inline-flex items-center mt-6 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition"
        >
          <FaDownload className="mr-2" />
          Download: {announcement.file}
        </a>
      </div>
    </div>
  );
};

export default AnnouncementDetails;
