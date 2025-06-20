import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaUpload, FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchAnnouncements } from "../../../utils/apiservice";

const Announcements = () => {
  const role = sessionStorage.getItem("currentRole");
  const navigate = useNavigate();
  const [announcements, setAnnoucements] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setAnnoucements(data.reverse());
    }
  }, [data]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Announcements</h2>
            {role === "super_admin" && (
              <button
                onClick={() => navigate("/post")}
                className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white transition-colors hover:bg-white hover:text-blue-600 hover:shadow-md hover:shadow-blue-500"
              >
                <FaUpload className="mr-2" />
                Post Announcement
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading/Error States */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && <p className="text-gray-600">Loading announcements...</p>}
        {isError && <p className="text-red-600">Error: {error.message}</p>}

        {/* Stats Cards */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FaCalendarAlt className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Announcements</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {announcements.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Announcements List */}
        {!isLoading && !isError && (
          <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-x-10">
            {announcements.map((announcement, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-emerald-100">
                  <div className="flex items-center justify-between">
                    <p className=" font-medium text-[#333]">Announcement</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(announcement.announcement_date)}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm border border-indigo-200 mb-2">
                    <span className="capitalize">
                      {announcement?.announcement_by?.designation?.[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {announcement.description}
                  </p>

                  {announcement.link && (
                    <a
                      href={announcement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      View Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
