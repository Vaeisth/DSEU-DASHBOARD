import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnnouncements } from "../../../utils/apiservice";
import { useEffect, useState } from "react";
import AnnouncementSlider from "../../UI/AnnouncementSlider";

const services = [
  {
    label: "Apply Leave",
    icon: <FontAwesomeIcon icon={faPaperPlane} className="text-[32px]" />,
    color: "#f3e6fa",
    path: "/Leave-request",
  },
  {
    label: "Track Leaves",
    icon: <EventNoteIcon fontSize="large" />,
    color: "#f3e6fa",
    path: "/leaves",
  },
  {
    label: "Announcements",
    icon: <AnnouncementIcon fontSize="large" />,
    color: "#fae3e3",
    path: "/announcements",
  },
  {
    label: "Calendar",
    icon: <CalendarMonthIcon fontSize="large" />,
    color: "#faf7e3",
    path: "/calendar",
  },
];

const buttonColors = [
  "bg-[#C4DAFA]",
  "bg-[#EFFBEA]",
  "bg-[#F1D9FC]",
  "bg-[#FBD5D7]",
  "bg-[#FBF5EA]",
  "bg-[#FBC4DF]",
  "bg-[#FCDFE0]",
  "bg-[#C6FFEB]",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [loaderColor, setLoaderColor] = useState(1);
  const { data: annoucements, isLoading: isAnnoucementLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaderColor((c) => c + 1);
    }, 100);
    return () => clearTimeout(timeout);
  }, [loaderColor]);

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen w-full mt-[-3rem]">
      {/* Cards */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10 items-stretch">
        {/* Attendance Status UI */}
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
                  <span className="text-2xl font-bold">4/8</span>
                  <span className="text-sm text-gray-500">hours</span>
                  <span className="text-xs text-gray-400 mt-1">(50%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-2xl shadow w-full h-full">
            <h3 className="text-xl font-bold text-gray-700 mb-6">Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center cursor-pointer p-4 h-[100px] rounded-xl shadow hover:shadow-lg transform transition-transform hover:scale-105 ${buttonColors[index]}`}
                  onClick={() => navigate(service.path)}
                >
                  <div className="mb-2">{service.icon}</div>
                  <span className="text-sm text-gray-900 text-center">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h3 className="text-xl font-bold text-gray-700 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Leave request approved</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Announcements */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-700">
            Latest Announcements
          </h3>
          <button
            onClick={() => navigate("/announcements")}
            className="font-semibold"
          >
            <div className="flex items-center gap-1 group cursor-pointer">
              <span className="text-blue-500 group-hover:underline">
                See all
              </span>
              <ArrowRight className="h-4 w-4 text-blue-500 group-hover:underline" />
            </div>
          </button>
        </div>

        {isAnnoucementLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <LoaderCircle
              className={`h-14 w-14 animate-spin ${
                loaderColor % 2 === 0 ? "text-blue-400" : "text-emerald-400"
              } transition-colors`}
            />
          </div>
        ) : (
          <div>
            <AnnouncementSlider announcements={annoucements} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
