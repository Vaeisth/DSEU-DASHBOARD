import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { FaArrowLeft, FaPlus, FaTimes } from "react-icons/fa";


const fetchCampuses = async () => {
  const token = sessionStorage.getItem("access_token");
  if (!token) throw new Error("No token found");

  const res = await apiRequestAxios({ url: 'http://134.209.144.96:8081/superadmin/get-all-campuses', method: 'GET' });
  return res.data.data;
};


const groupByZone = (data) => {
  const zoneMap = {};

  data.forEach(campus => {
    if (!zoneMap[campus.zone]) {
      zoneMap[campus.zone] = [];
    }
    zoneMap[campus.zone].push(campus.name);
  });

  return Object.keys(zoneMap).map(zone => ({
    zone,
    list: zoneMap[zone],
  }));
};

const CampusList = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [zone, setZone] = useState("");
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [geoBoundary, setgeoBoundary] = useState([{ latitude: "", longitude: "" }]);

  // Use React Query to fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["campuses"],
    queryFn: fetchCampuses,
  });

  const campuses = data ? groupByZone(data) : [];

  // Pre-select zone
  React.useEffect(() => {
    if (campuses.length > 0) setZone(campuses[0].zone);
  }, [data]);

  const toggleExpand = (zone) => {
    setExpanded((prev) => ({ ...prev, [zone]: !prev[zone] }));
  };

  const handleAddCoordinate = () => {
    setgeoBoundary([...geoBoundary, { latitude: "", longitude: "" }]);
  };

  const handleSave = () => {
    console.log({
      zone,
      name,
      description,
      address,
      geoBoundary,
    });
    setShowModal(false);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Campus</h2>
        <button className="text-blue-500" onClick={() => setShowModal(true)}>
          <FaPlus size={20} />
        </button>
      </div>

      <p className="text-center text-gray-600 mb-4">
        Complete List of all the DSEU campuses
      </p>

      <div className="space-y-6">
        {campuses.map((campus, index) => (
          <div key={index}>
            <h3 className="text-gray-700 font-semibold">{campus.zone}</h3>
            {campus.list.slice(0, expanded[campus.zone] ? campus.list.length : 2).map((name, i) => (
              <div key={i} className="bg-blue-100 p-3 rounded-lg shadow-sm mt-2 flex justify-between">
                <p className="text-gray-700">{name}</p>
                <Link to="/campus-info">
                  <span className="text-blue-500">→</span>
                </Link>
              </div>
            ))}
            <button
              onClick={() => toggleExpand(campus.zone)}
              className="text-blue-500 mt-2 text-sm"
            >
              {expanded[campus.zone] ? "See less ⬆" : "See all ⬇"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Campus</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-600">
                <FaTimes size={18} />
              </button>
            </div>

            <label className="text-sm text-gray-700">Select Zone</label>
            <select
              className="w-full p-2 border rounded mb-2"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
            >
              {campuses.map((c, idx) => (
                <option key={idx} value={c.zone}>{c.zone}</option>
              ))}
            </select>

            <label className="text-sm text-gray-700">Campus Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <label className="text-sm text-gray-700">Add Description</label>
            <textarea
              className="w-full p-2 border rounded mb-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="text-sm text-gray-700">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label className="text-sm text-gray-700">Add Co-ordinates</label>
            {geoBoundary.map((coord, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Longitude"
                  className="p-2 border rounded"
                  value={coord.longitude}
                  onChange={(e) =>
                    setgeoBoundary(
                      geoBoundary.map((c, i) =>
                        i === index ? { ...c, longitude: e.target.value } : c
                      )
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Latitude"
                  className="p-2 border rounded"
                  value={coord.latitude}
                  onChange={(e) =>
                    setgeoBoundary(
                      geoBoundary.map((c, i) =>
                        i === index ? { ...c, latitude: e.target.value } : c
                      )
                    )
                  }
                />
              </div>
            ))}

            <button
              className="w-full p-2 bg-gray-200 rounded text-gray-700 mb-4"
              onClick={handleAddCoordinate}
            >
              Add +
            </button>

            <div className="flex justify-between">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>
                Clear All
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusList;
