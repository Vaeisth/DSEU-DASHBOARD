import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../config/api.config";
import placeholder from "../../../assets/placeholder-pfp.jpg";


const fetchOnDutyOfficers = async () => {
  const { data } = await apiRequestAxios({
    endpoint: API_ENDPOINTS.ALL_ON_DUTY_USERS,
    method: "GET",
  });
  return data.data;
};

const OnDutyOfficers = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const { data: onDutyOfficers = [], isLoading, isError } = useQuery({
    queryKey: ["onDutyOfficers"],
    queryFn: fetchOnDutyOfficers,
    staleTime: 5 * 60 * 1000,
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

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center mb-2 px-1">
        <h3 className="text-sm font-semibold text-gray-800">
          On Duty Officers
        </h3>
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
            <p className="text-red-500">Failed to load officers</p>
          </div>
        ) : onDutyOfficers.length === 0 ? (
          <div className="min-w-[240px] sm:min-w-[280px] bg-white p-3 rounded-lg shadow-sm flex items-center justify-center">
            <p className="text-gray-500">No officers on duty</p>
          </div>
        ) : (
          onDutyOfficers.slice(0, 7).map((officer) => (
            <div
              key={officer._id}
              className="min-w-[240px] sm:min-w-[280px] max-w-[90%] bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/officer-details/${officer._id}`)}
            >
              <img
                src={officer.link_id?.picture || "https://via.placeholder.com/150"}
                alt={officer.name}
                className="w-10 h-10 rounded-full border-4 border-white shadow-lg object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholder;
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-xs truncate">
                  {officer.name || "Unknown Officer"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {officer.link_id?.campus?.name || "No Campus"}
                </p>
                <p className="text-[10px] text-gray-400">
                  {officer.link_id?.designation?.[0] || "No Designation"}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-green-600">
                  On Duty
                </span>
                <span className="text-[10px] text-gray-400">
                  {officer.Date}
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

export default OnDutyOfficers; 