import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaLink, FaFileAlt } from "react-icons/fa";
import img from "../../../assets/icons/img (1).png";
import { apiRequestAxios } from '../../../utils/api';
import { useQuery } from "@tanstack/react-query";

const fetchCampuses = async () => {
  const { data } = await apiRequestAxios({ 
    url: 'http://134.209.144.96:8081/superadmin/get-all-campuses', 
    method: 'GET' 
  });
  return data.data;
};

const PostAnnouncement = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [campus, setCampus] = useState("");
  const [zone, setZone] = useState("");
  const [file, setFile] = useState(null);

  const { data: campuses = [], isLoading } = useQuery({
    queryKey: ["campuses"],
    queryFn: fetchCampuses,
  });

  // Get unique zones from campuses
  const zones = [...new Set(campuses.map(campus => campus.zone))];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handlePost = async () => {
    if (!title || !description || !audience || !campus || !zone) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("zone", zone);
    formData.append("campus", campus);
    if (file?.type?.includes("image")) {
      formData.append("image", file);
    } else if (file) {
      formData.append("pdf_file", file);
    }

    try {
      const res = await apiRequestAxios({
        url: `http://134.209.144.96:8081/superadmin/create-announcement?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (res.data) {
        navigate('/announcements');
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert("Failed to post announcement. Please try again.");
    }
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-lg font-semibold mb-4 text-gray-800">Post Announcement</h1>
          
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                placeholder="Enter announcement title"
              />
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                rows="3"
                placeholder="Enter announcement description"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-xs font-medium text-gray-700 mb-1">Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select Audience</option>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-xs font-medium text-gray-700 mb-1">Zone</label>
                <select
                  value={zone}
                  onChange={(e) => {
                    setZone(e.target.value);
                    setCampus("");
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                >
                  <option value="">All Zones</option>
                  {zones.map((zoneName) => (
                    <option key={zoneName} value={zoneName}>
                      {zoneName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-xs font-medium text-gray-700 mb-1">Campus</label>
              <select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="">Select Campus</option>
                {campuses
                  .filter((c) => !zone || c.zone === zone)
                  .map((campus) => (
                    <option key={campus._id} value={campus.campus_id}>
                      {campus.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-xs font-medium text-gray-700 mb-1">Attachment</label>
              <div className="flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Choose File
                </button>
                {file && (
                  <span className="ml-2 text-xs text-gray-500">
                    {file.name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                className="px-4 py-1.5 bg-blue-600 border border-transparent rounded-md shadow-sm text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAnnouncement;
