import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import PendingApprovals from "../ViceChancellorUI/homepage/PendingApprovals";

import { buttonColors, services } from "../../Constants/adminDashboard";
import { getLeaveRequest, getOnDutyEmployees } from "./adminapi";
import { fetchLeavesAdmin, getActiveHours } from "../../utils/apiservice";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [onDutyData, setOnDutyData] = useState([]);

  const { data: leaveRequest } = useQuery({
    queryFn: getLeaveRequest,
    queryKey: ["admin-leave-request"],
    staleTime: 5 * 60 * 1000,
  });

  const { data: totalDuration } = useQuery({
    queryFn: getActiveHours,
    queryKey: ["totalDuration"],
    staleTime: 5 * 60 * 1000,
  });

  const { data: onDuty, isLoading: isOnDutyLoading } = useQuery({
    queryFn: getOnDutyEmployees,
    queryKey: ["onDutyEmployees"],
    staleTime: 5 * 60 * 1000,
  });

  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (onDuty) {
      setOnDutyData(onDuty.data.data);
    }
  }, [leaveRequest, onDuty, onDutyData]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 w-full min-h-screen">
      <div className="flex flex-col gap-5">
        <div className="flex lg:flex-row gap-5 flex-col">
          <div className="w-full lg:w-1/3">
            {/* Today's Attendance Card */}
            <div className="bg-white rounded-2xl shadow flex flex-col justify-between p-8 h-full w-full gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">
                    Your Today's Attendance
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {new Date().toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Present
                </span>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex flex-col">
                  <button className="text-blue-500 font-semibold text-lg">
                    Today
                  </button>
                  <span className="text-sm text-gray-500 mt-1">
                    8 hours required
                  </span>
                </div>

                <div className="relative w-36 h-36">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="10"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="skyblue"
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="125.6"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">
                      {" "}
                      {totalDuration?.data?.activeHours || 0}/8
                    </span>
                    <span className="text-sm text-gray-500">hours</span>
                    <span className="text-xs text-gray-400 mt-1">(50%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow w-full lg:w-2/3 h-fit">
            <h3 className="text-xl font-bold text-gray-700 mb-6">Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center cursor-pointer p-4 h-[100px] rounded-xl shadow hover:shadow-lg transform text-center transition-transform hover:scale-105 ${buttonColors[index]}`}
                  onClick={() => navigate(service.path)}
                >
                  <FontAwesomeIcon
                    icon={service.icon}
                    className="text-2xl text-gray-800 mb-1"
                  />
                  <span className="text-sm text-gray-900 text-center">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PendingApprovals queryFn={() => fetchLeavesAdmin("pending")} />

        <div className="bg-white p-6 rounded-2xl shadow mb-10 relative">
          <div className="flex flex-row justify-between w-full -mt-[5px]">
            <h3 className="text-2xl font-bold text-[#333]">
              On-Duty Employees
            </h3>
            <button
              className="ml-2 cursor-pointer text-blue-600 hover:underline"
              onClick={() => navigate("/admin/on-duty")}
            >
              See All
            </button>
          </div>

          {isOnDutyLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <LoaderCircle className="w-5 h-5 animate-spin" />
            </div>
          ) : onDutyData.length === 0 ? (
            <div className="mt-2 mr-2 text-slate-600">
              No one is on duty right now
            </div>
          ) : (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition ml-4 cursor-pointer"
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

                {onDutyData.slice(0, 7).map((officer) => (
                  <div
                    key={officer._id}
                    className="min-w-[240px] sm:min-w-[280px] max-w-[90%] bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      src={
                        officer.link_id?.picture ||
                        "https://via.placeholder.com/150"
                      }
                      alt={officer.name}
                      className="w-10 h-10 rounded-full border-4 border-white shadow-lg object-cover"
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
                ))}
              </div>

              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition mr-4 cursor-pointer"
              >
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
