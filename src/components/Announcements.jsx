import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFilter, FaUpload } from "react-icons/fa";

const initialAnnouncements = [
  {
    id: 1,
    facultyName: "Faculty name",
    designation: "Designation name",
    title: "B.tech admission open session 2024 - 25",
    description: "Lorem ipsum dolor sit amet, dummy dolor sit...",
    timeAgo: "2d ago",
    file: null,
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    facultyName: "Faculty name",
    designation: "Designation name",
    title: "B.tech admission open session 2024 - 25",
    description: "Lorem ipsum dolor sit amet, dummy dolor sit...",
    timeAgo: "2d ago",
    file: null,
    profileImage: "https://via.placeholder.com/50",
  },
];

const Announcements = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  // Handle file/image upload for a specific announcement
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

  return (
    
    <div className="p-4 bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-gray-900">Announcements</h2>
        
      </div>

      {/* Subtitle */}
      <p className="text-gray-900 text-lr font-bold mt-2">
        Important Updates and Opportunities
      </p>
      <p className="text-gray-600 text-sm mt-2">
        Explore the latest announcements, events ensuring you're always in the know.
      </p>
      <div className="flex justify-between items-center">
  <p className="text-gray-700 text-sm font-semibold">Total: 105</p>
  <button className="text-blue-500 flex items-center">
    <FaFilter size={18} className="mr-1" />
    <span className="text-sm">Filter</span>
  </button>
</div>


      {/* Date Range */}
      <div className="flex justify-between bg-[#F2F8FD] text-gray-600 text-sm mt-3 pb-2">
        <p>This week</p>
        <p className="font-medium">26/05/24 - 31/05/24</p>
      </div>

      {/* Announcements List */}
      <div className="mt-4 space-y-4 flex-grow">
        {announcements.map((item) => (
          
          <div
            key={item.id}
            className="bg-[#F6F6F6] p-4 rounded-lg shadow-md flex items-start gap-3 cursor-pointer hover:bg-gray-50"
          >
            <img
              src={item.profileImage}
              alt="Faculty"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="text-gray-900 font-semibold">{item.facultyName}</p>
              <p className="text-gray-500 text-xs">{item.designation}</p>
              <p className="text-sm font-semibold mt-1">{item.title}</p>
              <p className="text-xs text-gray-600">
                {item.description} <span className="text-blue-500">More</span>
              </p>

              {/* File Upload Section */}
              <label className="cursor-pointer flex items-center gap-2 bg-blue-100 text-xs text-blue-600 px-2 py-1 rounded-md mt-2 w-max">
                <FaUpload />
                <span>{item.file ? "Change File" : "Upload File"}</span>
                <input
                  type="file"
                  accept="image/*, .pdf, .docx"
                  onChange={(e) => handleFileUpload(e, item.id)}
                  className="hidden"
                />
              </label>

              {/* Preview Uploaded File */}
              {item.file && (
                <div className="mt-2">
                  {item.file.endsWith(".pdf") || item.file.endsWith(".docx") ? (
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      View File
                    </a>
                  ) : (
                    <img
                      src={item.file}
                      alt="Uploaded"
                      className="w-20 h-20 mt-2 rounded-lg border"
                    />
                  )}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-400">{item.timeAgo}</span>
          </div>
        ))}
      </div>

      {/* Post Button */}
      <button
        onClick={() => navigate("/post")}
        className="bg-blue-600 text-white py-3 rounded-[30px] w-full text-center text-lg font-semibold mt-4"
      >
        Post
      </button>
    </div>
  );
};

export default Announcements;
