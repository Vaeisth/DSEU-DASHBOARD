import React, { useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

const CampusPage = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(
    "The Ambedkar Delhi Skill and Entrepreneurship University (DSEU) Shakarpur Campus - I is a prominent institution in Delhi, dedicated to providing skill-based education and promoting entrepreneurship among students."
  );

  const [addressText, setAddressText] = useState(
    "Ambedkar DSEU Shakarpur Campus - I, Shakarpur (Opp. Madhuban), Delhi - 110092"
  );

  const [coordinates, setCoordinates] = useState([
    { latitude: "", longitude: "" },
    { latitude: "", longitude: "" },
    { latitude: "", longitude: "" },
    { latitude: "", longitude: "" },
    { latitude: "", longitude: "" },
  ]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCoordinateChange = (index, field, value) => {
    const newCoordinates = [...coordinates];
    newCoordinates[index][field] = value;
    setCoordinates(newCoordinates);
  };

  const handleAddCoordinate = () => {
    setCoordinates([...coordinates, { latitude: "", longitude: "" }]);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <button className="text-gray-700">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold">Your Profile</h1>
      </div>

      {/* Campus Name */}
      <div className="bg-gray-200 p-6 rounded-lg text-center mb-4 h-24 flex items-center justify-center">
        <h2 className="text-xl font-semibold">Ambedkar DSEU Shakarpur Campus- I</h2>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-300 rounded-lg p-1 mb-4">
        <button
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            activeTab === "basic" ? "bg-white shadow" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Info
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            activeTab === "coordinate" ? "bg-white shadow" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("coordinate")}
        >
          Co-ordinates
        </button>
      </div>

      {/* Conditional Rendering for Tabs */}
      {activeTab === "basic" ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold">About Campus</h3>
            <button className="text-gray-600" onClick={handleEditClick}>
              <FaEdit size={16} />
            </button>
          </div>

          <div className="bg-gray-100 p-3 rounded-lg">
            <h4 className="text-sm font-semibold mb-1">About</h4>
            {isEditing ? (
              <textarea
                className="w-full p-2 border rounded text-sm"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
              />
            ) : (
              <p className="text-xs text-gray-600">{aboutText}</p>
            )}

            <h4 className="text-sm font-semibold mt-3">Address</h4>
            {isEditing ? (
              <textarea
                className="w-full p-2 border rounded text-sm"
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
              />
            ) : (
              <p className="text-xs text-gray-600">{addressText}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold">Co-ordinates</h3>
            <button className="text-gray-600" onClick={handleEditClick}>
              <FaEdit size={16} />
            </button>
          </div>

          {/* Coordinates Form */}
          <div className="space-y-2">
            {coordinates.map((coord, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Latitude"
                  className="w-full p-2 border rounded text-sm"
                  value={coord.latitude}
                  onChange={(e) => handleCoordinateChange(index, "latitude", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Longitude"
                  className="w-full p-2 border rounded text-sm"
                  value={coord.longitude}
                  onChange={(e) => handleCoordinateChange(index, "longitude", e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Add Button */}
          <button
            className="w-full mt-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm"
            onClick={handleAddCoordinate}
          >
            Add +
          </button>
        </div>
      )}
    </div>
  );
};

export default CampusPage;
