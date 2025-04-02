import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AttachLinkDrawer = ({ onClose }) => {
  const [link, setLink] = useState("");

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-5 rounded-t-2xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-blue-600">Attach link</h2>
        <button onClick={onClose}>
          <FaTimes size={18} className="text-gray-600" />
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-1">You can add multiple links one by one.</p>

      {/* Input Field */}
      <div className="mt-4">
        <p className="text-gray-600">Link</p>
        <input
          type="text"
          placeholder="Insert here"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-lg mt-1"
        />
      </div>

      {/* Save Button */}
      <button
        className={`w-full py-3 rounded-lg mt-6 ${
          link ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"
        }`}
        disabled={!link}
      >
        Save
      </button>
    </div>
  );
};

export default AttachLinkDrawer;
