import { useQuery } from "@tanstack/react-query";
import { getVcAllRequests } from "../../utils/apiservice";
import { useState, useMemo } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Package,
  ArrowRight,
} from "lucide-react";
import Loader from "../UI/Loader";

const statuses = ["Pending", "Approved", "Rejected"];

const IncomingRequests = () => {
  const [activeTab, setActiveTab] = useState(statuses[0]);

  const {
    data = [],
    status,
    error,
  } = useQuery({
    queryFn: getVcAllRequests,
    queryKey: ["get-vc-all-requests"],
    staleTime: 7 * 60 * 1000,
  });

  const { pendingData, approvedData, rejectedData } = useMemo(() => {
    const pendingData = [],
      approvedData = [],
      rejectedData = [];
    data.forEach((d) => {
      if (d.status === "Approved") approvedData.push(d);
      else if (d.status === "Pending") pendingData.push(d);
      else rejectedData.push(d);
    });
    return { pendingData, approvedData, rejectedData };
  }, [data]);

  if (status === "pending") return <Loader />;

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 text-center">
            {error?.message || "Unable to load requests at the moment."}
          </p>
        </div>
      </div>
    );
  }

  const getActiveData = () => {
    if (activeTab === "Pending") return pendingData;
    if (activeTab === "Approved") return approvedData;
    return rejectedData;
  };

  const activeData = getActiveData();

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "Approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getTabCounts = () => ({
    Pending: pendingData.length,
    Approved: approvedData.length,
    Rejected: rejectedData.length,
  });

  const tabCounts = getTabCounts();

  return (
    <div className="pt-3 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center md:mb-8 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333] mb-4">
            Incoming Requests
          </h1>
          <p className="text-gray-600 md:text-lg text-[16px]">
            Manage and track all campus requests in one place
          </p>
        </div>

        {/* Status Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2 backdrop-blur-sm border border-white/20">
            <div className="flex space-x-1">
              {statuses.map((tab) => (
                <button
                  key={tab}
                  className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 hover:cursor-pointer ${
                    activeTab === tab
                      ? "bg-blue-500 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {getStatusIcon(tab)}
                  <span>{tab}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === tab
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tabCounts[tab]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeData.length > 0 ? (
            <div className="space-y-6">
              {activeData.map((item, index) => (
                <div
                  key={item.request_id}
                  className="bg-white rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <Package className="w-5 h-5 text-blue-500" />
                        <span>{item.campus_name}</span>
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-1 ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {getStatusIcon(item.status)}
                        <span>{item.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Request Info */}
                    <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Request Date: {item.date_of_request}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Items Requested */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                          <ArrowRight className="w-4 h-4 text-blue-500" />
                          <span>Items Requested</span>
                        </h4>

                        <div className="space-y-2">
                          {item.items.map((itm, idx) => (
                            <div
                              key={idx}
                              className="bg-blue-50 rounded-lg p-3 flex items-center justify-between border border-blue-100"
                            >
                              <span className="font-medium text-gray-800">
                                {itm.item_name}
                              </span>
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">
                                Qty: {itm.qty}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Approve Reject buttons */}
                        {activeTab === "Pending" && (
                          <div className="flex items-center justify-between w-full mt-4 space-x-4">
                            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-colors duration-300 cursor-pointer">
                              Approve {item.request_id}
                            </button>
                            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-colors duration-300 cursor-pointer">
                              Reject
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Items Issued */}
                      {item.issued && item.issued.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Items Issued</span>
                          </h4>
                          <div className="space-y-2">
                            {item.issued.map((itm, idx) => (
                              <div
                                key={idx}
                                className="bg-green-50 rounded-lg p-3 border border-green-100"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-gray-800">
                                    {itm.item_name}
                                  </span>
                                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                                    Qty: {itm.qty}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                  {itm.Item_Type}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {getStatusIcon(activeTab)}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No {activeTab} Requests
                </h3>
                <p className="text-gray-600">
                  There are currently no {activeTab.toLowerCase()} requests to
                  display.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default IncomingRequests;
