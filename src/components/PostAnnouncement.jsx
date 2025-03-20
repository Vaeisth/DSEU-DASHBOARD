import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaLink, FaFileAlt, FaPlus } from "react-icons/fa"; // Updated FaImage to FaFileAlt
import img from "../assets/icons/img (1).png";

const PostAnnouncement = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Function to open file picker for all file types
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[40px] font-bold text-gray-800">
          New Announcement
        </h2>

        {/* Right Top Icons - Clickable */}
        <div className="flex space-x-[55px] ">
          <button
            onClick={() => navigate("/schedule")}
            className="text-gray-600 hover:cursor-pointer "
          >
            <FaClock size={40} />
          </button>
          <button
            onClick={() => navigate("/attach-link")}
            className="text-gray-600 hover:cursor-pointer"
          >
            <FaLink size={40} />
          </button>
          {/* Clickable File Upload Button */}
          <button
            onClick={openFilePicker}
            className="text-gray-600 hover:cursor-pointer"
          >
            <FaFileAlt size={40} /> {/* Changed from FaImage to FaFileAlt */}
          </button>
        </div>
      </div>

      {/* Hidden File Input for All File Types */}
      <input
        type="file"
        accept="*/*" // Allows all file types
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files.length > 0) {
            alert(`Selected File: ${e.target.files[0].name}`);
          }
        }}
      />

      <div className="flex gap-[15px] border-b p-4 mb-5">
        <img className="w-70px" src={img}></img>
        <span className="flex flex-col mt-6">
          <p className="text-4xl">VC Name</p>
          <p className="text-2xl">Designation name</p>
        </span>
      </div>

      <div className="flex space-x-4">
        <p className="text-3xl mt-1">To:</p>
        <select className="w-[100%] p-3 border">
          <option selected disabled>
            Select
          </option>
          <option>Everyone</option>
          <option>Student</option>
          <option>Faculity</option>
        </select>
      </div>

      {/* Post Button */}
      <button className="bg-gray-400 text-white py-3 w-full mt-4 rounded-lg">
        Post
      </button>
    </div>
  );
};

export default PostAnnouncement;
