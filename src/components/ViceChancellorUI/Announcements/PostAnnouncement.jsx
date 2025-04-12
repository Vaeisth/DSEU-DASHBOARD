import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaLink, FaFileAlt } from "react-icons/fa";
import img from "../../../assets/icons/img (1).png";

const PostAnnouncement = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      alert(`Selected File: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 relative">
        {/* Floating Action Icons */}
        <div className="absolute top-4 right-4 flex space-x-4">
          <button
            onClick={() => navigate("/schedule")}
            className="text-gray-500 hover:text-gray-800 transition"
            title="Schedule"
          >
            <FaClock size={20} />
          </button>
          <button
            onClick={() => navigate("/attach-link")}
            className="text-gray-500 hover:text-gray-800 transition"
            title="Attach Link"
          >
            <FaLink size={20} />
          </button>
          <button
            onClick={openFilePicker}
            className="text-gray-500 hover:text-gray-800 transition"
            title="Attach File"
          >
            <FaFileAlt size={20} />
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="*/*"
          onChange={handleFileChange}
        />

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Post Announcement</h2>

        {/* VC Info */}
        <div className="flex items-center mb-6">
          <img src={img} alt="VC" className="w-[60px] h-[60px] rounded-full mr-4" />
          <div>
            <p className="text-lg font-semibold text-gray-800">VC Name</p>
            <p className="text-sm text-gray-500">Designation</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Audience */}
          <div>
            <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-1">
              To:
            </label>
            <select
              id="audience"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
              defaultValue=""
            >
              <option value="" disabled>Select audience</option>
              <option value="everyone">Everyone</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          {/* Announcement Content (optional) */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Announcement
            </label>
            <textarea
              id="content"
              rows="5"
              placeholder="Write your announcement here..."
              className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Post Button */}
          <button className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-700 transition">
            Post Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAnnouncement;
