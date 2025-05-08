import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaLink, FaFileAlt } from "react-icons/fa";
import img from "../../../assets/icons/img (1).png";
import { apiRequest } from '../../../utils/api';

const PostAnnouncement = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [campus, setCampus] = useState("Main"); // Default or dynamic
  const [zone, setZone] = useState("East"); // Default or dynamic
  const [file, setFile] = useState(null);

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

    const token = sessionStorage.getItem("access_token");
    if (!token) {
      alert("User not authenticated.");
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
      const res = await apiRequest(
        `http://134.209.144.96:8081/superadmin/create-announcement?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Announcement posted successfully!");
        navigate(-1);
      } else {
        alert("Error: " + (data.message || "Something went wrong"));
        console.error(data);
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 relative">
        {/* Floating Action Icons */}
        <div className="absolute top-4 right-4 flex space-x-4">
          <button onClick={() => navigate("/schedule")} title="Schedule"><FaClock size={20} /></button>
          <button onClick={() => navigate("/attach-link")} title="Attach Link"><FaLink size={20} /></button>
          <button onClick={() => fileInputRef.current.click()} title="Attach File"><FaFileAlt size={20} /></button>
        </div>

        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Post Announcement</h2>

        <div className="flex items-center mb-6">
          <img src={img} alt="VC" className="w-[60px] h-[60px] rounded-full mr-4" />
          <div>
            <p className="text-lg font-semibold text-gray-800">VC Name</p>
            <p className="text-sm text-gray-500">Designation</p>
          </div>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md p-3"
          />

          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border border-gray-300 rounded-md p-3"
          />

          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3"
          >
            <option value="" disabled>Select audience</option>
            <option value="employee">Students</option>
            <option value="admin">Faculty</option>
          </select>

          <input
            type="text"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            placeholder="Campus"
            className="w-full border border-gray-300 rounded-md p-3"
          />

          <input
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            placeholder="Zone"
            className="w-full border border-gray-300 rounded-md p-3"
          />

          {file && (
            <div className="text-sm text-gray-600">
              File selected: <strong>{file.name}</strong>
            </div>
          )}

          <button
            onClick={handlePost}
            className="w-full bg-gray-800 text-white py-3 rounded-md font-medium hover:bg-gray-700"
          >
            Post Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAnnouncement;
