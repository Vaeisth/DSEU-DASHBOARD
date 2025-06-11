import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequestAxios } from "../../../utils/api";
import { API_ENDPOINTS } from "../../../config/api.config";
import { useQuery } from "@tanstack/react-query";

const fetchCampuses = async () => {
  const { data } = await apiRequestAxios({
    endpoint: API_ENDPOINTS.ALL_CAMPUSES,
    method: "GET",
  });
  return data.data;
};

const PostAnnouncement = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [campus, setCampus] = useState("");
  const [zone, setZone] = useState("");
  const [file, setFile] = useState(null);

  const { data: campuses = [], isLoading } = useQuery({
    queryKey: ["campuses"],
    queryFn: fetchCampuses,
  });

  useEffect(() => {
    if (campuses) {
      const names = campuses.map((cam) => cam.name);
      console.log(names);
      
    }
  }, [campuses]);

  // Get unique zones from campuses
  const zones = [...new Set(campuses.map((campus) => campus.zone))];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handlePost = async () => {
    if (!title || !description || !campus || !zone) {
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
        endpoint: `${
          API_ENDPOINTS.CREATE_ANNOUNCEMENT
        }?title=${encodeURIComponent(title)}&description=${encodeURIComponent(
          description
        )}`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        navigate("/announcements");
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
          <h1 className="md:text-2xl text-xl font-semibold mb-4 text-gray-800 text-center mt-2">
            Post Announcement
          </h1>

          <div className="space-y-3">
            {/* Title */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Title
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  className="peer w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
                />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 peer-focus:w-full"></span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Description
              </label>
              <div className="relative w-full">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter announcement description"
                  rows="3"
                  className="peer w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500 resize-none"
                />
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 peer-focus:w-full"></span>
              </div>
            </div>

            {/* Audience and Zone */}
            <div>
              {/* Zone */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Zone
                </label>
                <div className="relative w-full">
                  <select
                    value={zone}
                    onChange={(e) => {
                      setZone(e.target.value);
                      setCampus("");
                    }}
                    className="peer w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-500"
                  >
                    <option value="">All Zones</option>
                    {zones.map((zoneName) => (
                      <option key={zoneName} value={zoneName}>
                        {zoneName}
                      </option>
                    ))}
                  </select>
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 peer-focus:w-full"></span>
                </div>
              </div>
            </div>

            {/* Campus */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Campus
              </label>
              <div className="relative w-full">
                <select
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="peer w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-500"
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
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 peer-focus:w-full"></span>
              </div>
            </div>

            {/* File Input */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Attachment
              </label>
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

            {/* Buttons */}
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
