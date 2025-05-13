import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchPendingLeaves } from "../../../utils/apiservice";

const PendingApprovals = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const {
    data: pendingLeaves = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingLeaves"],
    queryFn: fetchPendingLeaves,
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center mb-2 px-1">
        <h3 className="text-sm font-semibold text-gray-800">
          Pending Approvals
        </h3>
        <button
          onClick={() => navigate("/track-leave")}
          className="text-blue-600 text-xs font-medium hover:underline"
        >
          See all &gt;
        </button>
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-8 py-2 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx="true">{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {isLoading ? (
          <div className="min-w-[240px] sm:min-w-[280px] bg-white p-3 rounded-lg shadow-sm flex items-center justify-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : isError ? (
          <div className="min-w-[240px] sm:min-w-[280px] bg-white p-3 rounded-lg shadow-sm flex items-center justify-center">
            <p className="text-red-500">Failed to load approvals</p>
          </div>
        ) : pendingLeaves.length === 0 ? (
          <div className="min-w-[240px] sm:min-w-[280px] bg-white p-3 rounded-lg shadow-sm flex items-center justify-center">
            <p className="text-gray-500">No pending approvals</p>
          </div>
        ) : (
          pendingLeaves.slice(0, 7).map((leave) => (
            <div
              key={leave._id}
              className="min-w-[240px] sm:min-w-[280px] max-w-[90%] bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/leave-details/${leave._id}`)}
            >
              <img
                src={leave.user_id?.picture || "https://via.placeholder.com/40"}
                alt={leave.user_id?.name || "User"}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/40";
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-xs truncate">
                  {leave.user_id?.name || "Unknown User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {leave.user_id?.campus?.name || "No Campus"}
                </p>
                <p className="text-[10px] text-gray-400">
                  {formatDate(leave.createdAt)}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-gray-600">
                  {leave.leave_type}
                </span>
                <span className="text-[10px] text-gray-400">
                  {leave.start_date} - {leave.end_date}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition"
      >
        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
      </button>
    </div>
  );
};

export default PendingApprovals;
