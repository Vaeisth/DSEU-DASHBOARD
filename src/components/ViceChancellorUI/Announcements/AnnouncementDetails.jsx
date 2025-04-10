import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const announcements = [
  {
    id: 1,
    facultyName: "Faculty name",
    designation: "Designation name",
    title: "B.tech admission open session 2024-25",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    timeAgo: "2d ago",
    file: "File_can be lo...",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    facultyName: "Faculty name",
    designation: "Designation name",
    title: "Faculty event announcement 2024",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    timeAgo: "2d ago",
    file: "File_can be lo...",
    profileImage: "https://via.placeholder.com/50",
  },
];

const AnnouncementDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  // Find the matching announcement by ID
  const announcement = announcements.find((item) => item.id === parseInt(id));

  if (!announcement) {
    return <p className="text-center text-red-500">Announcement not found</p>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-700 mb-4">
        <FaArrowLeft size={20} className="mr-2" />
        <span>Back</span>
      </button>

      {/* Announcement Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <img src={announcement.profileImage} alt="Faculty" className="w-12 h-12 rounded-full" />
          <div className="ml-3">
            <p className="text-gray-800 font-semibold">{announcement.facultyName}</p>
            <p className="text-gray-500 text-sm">{announcement.designation}</p>
            <p className="text-xs text-gray-400">{announcement.timeAgo}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">{announcement.title}</h2>
        <p className="text-gray-600">{announcement.content}</p>

        {/* Download File */}
        <div className="mt-4 bg-blue-100 text-blue-600 px-3 py-2 rounded-md inline-block text-sm">
          {announcement.file}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetails;
