import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from "../../../utils/api";
import { API_BASE_URL, API_ENDPOINTS } from "../../../config/api.config";
import {
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaMapMarkerAlt,
  FaBuilding,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";

const fetchCampuses = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await apiRequestAxios({
    endpoint: API_ENDPOINTS.ALL_CAMPUSES,
    method: "GET",
  });
  return res.data.data;
};

const groupByZone = (data) => {
  const zoneMap = {};

  data.forEach((campus) => {
    if (!zoneMap[campus.zone]) {
      zoneMap[campus.zone] = [];
    }
    zoneMap[campus.zone].push({
      name: campus.name,
      _id: campus._id,
    });
  });

  return Object.keys(zoneMap).map((zone) => ({
    zone,
    list: zoneMap[zone],
  }));
};

const CampusList = () => {
  const [expanded, setExpanded] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [zone, setZone] = useState("");
  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [geoBoundary, setgeoBoundary] = useState([
    { latitude: "", longitude: "" },
  ]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["campuses"],
    queryFn: fetchCampuses,
    staleTime: 7 * 60 * 1000,
  });

  const campuses = data ? groupByZone(data) : [];

  const queryClient = useQueryClient();

  useEffect(() => {
    if (campuses.length > 0) setZone(campuses[0].zone);
  }, [campuses]);

  const toggleExpand = (zone) => {
    setExpanded((prev) => ({ ...prev, [zone]: !prev[zone] }));
  };

  const handleAddCoordinate = () => {
    setgeoBoundary([...geoBoundary, { latitude: "", longitude: "" }]);
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!zone || !name || !description || !address) {
        alert("Please fill all required fields.");
        return;
      }

      // Validate coordinates
      const validCoordinates = geoBoundary.every(
        (coord) =>
          coord.latitude &&
          coord.longitude &&
          !isNaN(parseFloat(coord.latitude)) &&
          !isNaN(parseFloat(coord.longitude))
      );

      if (!validCoordinates) {
        alert("Please enter valid coordinates for all points.");
        return;
      }

      // Format coordinates for API
      const formattedCoordinates = geoBoundary.map((coord) => [
        parseFloat(coord.longitude),
        parseFloat(coord.latitude),
      ]);

      // Prepare data for API
      const campusData = {
        name: name.trim(),
        description: description.trim(),
        address: address.trim(),
        geo_boundary: formattedCoordinates,
        campus_id: Math.floor(Date.now() / 1000), // Using Unix timestamp as numeric ID
      };

      console.log("Sending data:", campusData); // Debug log

      // Make API request
      await apiRequestAxios({
        endpoint: `${API_ENDPOINTS.ADD_CAMPUSES}?zone=${encodeURIComponent(
          zone.trim()
        )}`,
        method: "POST",
        data: campusData,
      });

      // Close modal and reset form
      setShowModal(false);
      setZone("");
      setname("");
      setDescription("");
      setAddress("");
      setgeoBoundary([{ latitude: "", longitude: "" }]);

      // Show success message
      showSuccessToast("Campus added");

      // Invalidate and refetch campuses query
      queryClient.invalidateQueries(["campuses"]);
    } catch (error) {
      console.error("Error adding campus:", error);
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        endpoint: API_ENDPOINTS.ADD_CAMPUSES,
        fullUrl: `${API_BASE_URL}${API_ENDPOINTS.ADD_CAMPUSES}`,
      });
      console.log(error.response?.data?.message);
      showErrorToast("Failed");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Loading campus information...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to Load Campuses
          </h3>
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
            <h2 className="text-xl font-bold text-gray-800">
              Campus Management
            </h2>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            DSEU Campuses
          </h3>

          <div className="space-y-6">
            {campuses.map((campus, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <div
                  className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(campus.zone)}
                >
                  <div className="flex items-center">
                    <FaBuilding className="text-blue-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {campus.zone}
                    </h3>
                  </div>
                  {expanded[campus.zone] ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </div>

                <div
                  className={`transition-all duration-300 ${
                    expanded[campus.zone]
                      ? "max-h-96 overflow-y-auto"
                      : "max-h-0"
                  } overflow-hidden`}
                >
                  <div className="p-4 space-y-3">
                    {campus.list.map((campusInfo, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-blue-500 mr-3" />
                          <span className="text-gray-700">
                            {campusInfo.name}
                          </span>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Add New Campus
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Zone Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Zone
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                    >
                      <option value="">Select Zone</option>
                      {campuses.map((c, idx) => (
                        <option key={idx} value={c.zone}>
                          {c.zone}
                        </option>
                      ))}
                    </select>
                    <FaBuilding className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Campus Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Campus Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Enter campus name"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter campus description"
                    rows="3"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter campus address"
                  />
                </div>

                {/* Coordinates Section */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Boundary Coordinates
                    </label>
                    <button
                      onClick={handleAddCoordinate}
                      className="flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FaPlus className="mr-1" size={12} />
                      Add Point
                    </button>
                  </div>

                  <div className="space-y-3">
                    {geoBoundary.map((coord, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">
                            Longitude
                          </label>
                          <input
                            type="text"
                            placeholder="Enter longitude"
                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={coord.longitude}
                            onChange={(e) =>
                              setgeoBoundary(
                                geoBoundary.map((c, i) =>
                                  i === index
                                    ? { ...c, longitude: e.target.value }
                                    : c
                                )
                              )
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500">
                            Latitude
                          </label>
                          <input
                            type="text"
                            placeholder="Enter latitude"
                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={coord.latitude}
                            onChange={(e) =>
                              setgeoBoundary(
                                geoBoundary.map((c, i) =>
                                  i === index
                                    ? { ...c, latitude: e.target.value }
                                    : c
                                )
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
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
