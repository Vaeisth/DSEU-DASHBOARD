import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonColors, services } from "../../Constants/adminDashboard";
import { getLeaveRequest } from "./adminapi";
import { getActiveHours } from "../../utils/apiservice";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [leaveRequestData, setLeaveRequestData] = useState([]);

  const { data: leaveRequest, isLoading: isRequestLoading } = useQuery({
    queryFn: getLeaveRequest,
    queryKey: ["admin-leave-request"],
  });

  const { data: totalDuration, isLoading: isDurationLoading } = useQuery({
    queryFn: getActiveHours,
    queryKey: ["totalDuration"],
  });

  useEffect(() => {
    if (leaveRequest) {
      setLeaveRequestData(leaveRequest.data.data);
    }

    console.log(totalDuration);
  }, [leaveRequest, totalDuration]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 w-full">
      <div className="flex flex-col gap-5">
        <div className="flex lg:flex-row gap-5 flex-col">
          {/* Todays attendace card */}
          <div className="bg-white p-6 rounded-2xl shadow pt-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Your today's attendance
                </h3>
                <p className="text-gray-600">
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

            <div className="flex justify-between items-center">
              <button className="text-blue-500 font-semibold">Today</button>
              <div className="relative w-24 h-24">
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
                    stroke="#F59E0B"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="125.6"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold">4/8</span>
                  <span className="text-sm text-gray-500">hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
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

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow mb-10">
          <div className="flex flex-row justify-between w-full -mt-[5px]">
            <h3 className="text-2xl font-bold text-[#333]">
              Pending Approvals
            </h3>
            <button
              className="ml-2 cursor-pointer text-blue-600 hover:underline"
              onClick={() => navigate("/admin/track-leave")}
            >
              See All
            </button>
          </div>
          {isRequestLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <LoaderCircle className="w-5 h-5 animate-spin" />
            </div>
          ) : leaveRequestData.length === 0 ? (
            <div className="mt-2 mr-2 text-slate-600">No request as of now</div>
          ) : (
            <div>Meow</div>
          )}
        </div>

       {/* ON duty */} 
      </div>
    </div>
  );
};

export default AdminDashboard;
