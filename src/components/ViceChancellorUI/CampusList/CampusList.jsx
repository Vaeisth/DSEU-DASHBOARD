import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { API_ENDPOINTS } from '../../../config/api.config';
import { FaArrowLeft, FaPlus, FaTimes, FaMapMarkerAlt, FaBuilding, FaChevronDown, FaChevronUp } from "react-icons/fa";

const fetchCampuses = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await apiRequestAxios({ 
    endpoint: API_ENDPOINTS.ALL_CAMPUSES,
    method: 'GET' 
  });
  return res.data.data;
};

const groupByZone = (data) => {
  const zoneMap = {};

  data.forEach(campus => {
    if (!zoneMap[campus.zone]) {
      zoneMap[campus.zone] = [];
    }
    zoneMap[campus.zone].push({
      name: campus.name,
      _id: campus._id
    });
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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["campuses"],
    queryFn: fetchCampuses,
  });

  const campuses = data ? groupByZone(data) : [];

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

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-600">Loading campus information...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Campuses</h3>
        <p className="text-gray-600">{error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Campus Management</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Campus
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">DSEU Campuses</h3>
          
          <div className="space-y-6">
            {campuses.map((campus, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <div 
                  className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(campus.zone)}
                >
                  <div className="flex items-center">
                    <FaBuilding className="text-blue-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">{campus.zone}</h3>
                  </div>
                  {expanded[campus.zone] ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                </div>
                
                <div className={`transition-all duration-300 ${expanded[campus.zone] ? 'max-h-96 overflow-y-auto' : 'max-h-0'} overflow-hidden`}>
                  <div className="p-4 space-y-3">
                    {campus.list.map((campusInfo, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-blue-500 mr-3" />
                          <span className="text-gray-700">{campusInfo.name}</span>
                        </div>
                        <Link 
                          to={`/campus/${campusInfo._id}`}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Add New Campus</h3>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Zone</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                  >
                    {campuses.map((c, idx) => (
                      <option key={idx} value={c.zone}>{c.zone}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campus Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Enter campus name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter campus description"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter campus address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coordinates</label>
                  {geoBoundary.map((coord, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Longitude"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mb-4"
                    onClick={handleAddCoordinate}
                  >
                    Add Coordinates
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={handleSave}
                >
                  Save Campus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusList;
