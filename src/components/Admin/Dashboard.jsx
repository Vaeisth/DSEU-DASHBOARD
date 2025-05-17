import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Clock, Clock3, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonColors, services } from "../../Constants/adminDashboard";
import { getLeaveRequest, markOnDuty } from "./adminapi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [onDuty, setOnDuty] = useState(false);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [leaveRequestData, setLeaveRequestData] = useState([]);

  const { data: leaveRequest, isLoading: isRequestLoading } = useQuery({
    queryFn: getLeaveRequest,
    queryKey: ["admin-leave-request"],
  });

  const dutyMutation = useMutation({
    mutationFn: async (remarks) => {
      return await markOnDuty(remarks);
    },
    onSuccess: () => {
      setShowRemarks(false);
      setRemarks("");
      setOnDuty(true);
    },
  });

  useEffect(() => {
    if (leaveRequest) {
      setLeaveRequestData(leaveRequest.data.data);
    }
  }, [leaveRequest]);

  const handleDutyChange = (e) => {
    const status = e.target.checked;
    if (status) {
      setShowRemarks(true);
    } else {
      setOnDuty(false);
      dutyMutation.mutate({ status: false, remarks: "" });
    }
  };

  const handleSubmitRemarks = () => {
    setOnDuty(true);
    setShowRemarks(false);
    dutyMutation.mutate({ status: true, remarks });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen w-full">
      <div className="flex flex-col gap-5">
        {/* On duty */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">On Duty</h3>
              <p className="text-gray-600">
                {new Date().toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <div className="flex items-center mt-2 text-gray-500">
                <Clock />
                <span className="ml-2">Punch in 8:40 AM</span>
              </div>
            </div>
            <div className="relative inline-block w-14 h-7 transition duration-200 ease-in-out">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="absolute w-0 h-0 opacity-0"
                checked={onDuty}
                onChange={handleDutyChange}
                disabled={dutyMutation.isPending}
              />
              <label
                htmlFor="toggle"
                className={`block overflow-hidden h-7 rounded-full ${
                  onDuty ? "bg-blue-600" : "bg-gray-300"
                } cursor-pointer`}
              >
                <span
                  className={`block h-7 w-7 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${
                    onDuty ? "translate-x-7" : "translate-x-0"
                  }`}
                ></span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row gap-5 flex-col">
          {/* Todays attendace card */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Your today's attendance
                </h3>
                <p className="text-gray-600">Sat, 25 May, 2024</p>
                <div className="flex items-center mt-2 text-gray-500">
                  <Clock3 className="h-5 w-5 mr-2" />
                  <span>Punch in 8:30 AM</span>
                </div>
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
                  className={`flex flex-col justify-center items-center cursor-pointer p-4 h-[100px] rounded-xl shadow hover:shadow-lg transform text-center transition-transform hover:scale-105 ${buttonColors[index]} animate-spin`}
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
      </div>

      {/* Remarks Modal */}
      {showRemarks && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Remarks
            </h2>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your remarks here..."
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => {
                  setShowRemarks(false);
                  setRemarks("");
                }}
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRemarks}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
