import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PendingApprovals = ({ queryFn }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const {
    data: pendingLeaves = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingLeaves"],
    queryFn,
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

  // useEffect(() => {
  //   if (pendingLeaves) {
  //     console.log(pendingLeaves);
  //   }
  // }, [pendingLeaves]);

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
    <div className="relative w-full bg-white p-4 rounded-xl shadow-md shadow-blue-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 px-1">
        <h3 className="text-2xl font-bold text-[#333]">
          Pending Approvals
        </h3>
        <button
          onClick={() => navigate("/admin/track-leave")}
          className="text-blue-600 text-md font-base hover:underline cursor-pointer"
        >
          See all 
        </button>
      </div>

      {/* Scroll Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition ml-2 my-2"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-gray-700 text-sm" />
      </button>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-8 py-2 scroll-smooth scrollbar-hide"
      >
        {isLoading ? (
          <div className="min-w-[260px] h-28 bg-white p-4 rounded-xl shadow-sm flex items-center justify-center">
            <p className="text-gray-500 text-sm">Loading...</p>
          </div>
        ) : isError ? (
          <div className="min-w-[260px] h-28 bg-white p-4 rounded-xl shadow-sm flex items-center justify-center">
            <p className="text-red-500 text-sm">Failed to load approvals</p>
          </div>
        ) : pendingLeaves.length === 0 ? (
          <div className="min-w-[260px] h-28 bg-white p-4 rounded-xl shadow-sm flex items-center justify-center">
            <p className="text-gray-500 text-sm">No pending approvals</p>
          </div>
        ) : (
          pendingLeaves.slice(0, 7).map((leave) => (
            <div
              key={leave._id}
              onClick={() => navigate(`/leave-details/${leave._id}`)}
              className="min-w-[300px] h-28 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-4 cursor-pointer"
            >
              <img
                src={leave.user_id?.picture || "https://via.placeholder.com/40"}
                alt={leave.user_id?.name || "User"}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/40";
                }}
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {leave.user_id?.name || "Unknown User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {leave.user_id?.campus?.name || "No Campus"}
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  {formatDate(leave.start_date)}
                </p>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-xs font-medium text-gray-700">
                  {leave.leave_type}
                </span>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">
                  {leave.start_date} - {leave.end_date}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition my-2 md:mr-4 mr-2 sm:mr-3"
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-gray-700 text-sm"
        />
      </button>
    </div>
  );
};

export default PendingApprovals;
