import { useQuery } from "@tanstack/react-query";
import { getOnDutyEmployees } from "./adminapi";
import { useEffect, useState } from "react";

const OnDuty = () => {
  const [onDutyData, setOnDutyData] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryFn: getOnDutyEmployees,
    queryKey: ["getOnDuty"],
  });

  useEffect(() => {
    if (data && data.data?.data) {
      setOnDutyData(data.data?.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500 text-lg">
          Loading on-duty employees...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-red-500 font-semibold">
        Error loading data. Please try again later.
      </div>
    );
  }

  if (!onDutyData.length) {
    return (
      <div className="text-center text-gray-500 mt-10 text-xl">
        No on-duty employees found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-500">
        On-Duty Employees
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {onDutyData.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={item.link_id?.picture || "/default-avatar.png"}
                alt={item.link_id?.name || "Employee"}
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.link_id?.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.link_id?.designation?.join(", ") || "No designation"}
                </p>
              </div>
            </div>
            <div className="space-y-1 text-gray-700">
              <p>
                <span className="font-medium">Date: </span>
                {new Date(item.Date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Status: </span>
                <span
                  className={`font-semibold ${
                    item.status === "On Duty"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <p>
                <span className="font-medium">Remarks: </span>
                {item.remarks || "-"}
              </p>
              <p>
                <span className="font-medium">Department: </span>
                {(item.link_id?.department || []).join(", ") || "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnDuty;
