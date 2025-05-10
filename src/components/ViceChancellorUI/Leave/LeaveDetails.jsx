import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequestAxios } from '../../../utils/api';

const fetchLeaveDetails = async (id) => {
  // First try to fetch from pending requests
  const pendingResponse = await apiRequestAxios({ 
    url: "http://134.209.144.96:8081/superadmin/get-leave-requests", 
    method: 'GET' 
  });
  
  // Check if the leave request is in pending requests
  let leaveRequest = pendingResponse.data.data.find(leave => leave._id === id);
  
  // If not found in pending, try history
  if (!leaveRequest) {
    const historyResponse = await apiRequestAxios({
      url: "http://134.209.144.96:8081/superadmin/get-leave-requests-history",
      method: 'GET'
    });
    leaveRequest = historyResponse.data.data.find(leave => leave._id === id);
  }

  if (!leaveRequest) {
    throw new Error("Leave request not found");
  }
  return leaveRequest;
};

const approveLeave = async (id) => {
  const { data } = await apiRequestAxios({
    url: `http://134.209.144.96:8081/superadmin/leave-request/${id}/approve`,
    method: 'PATCH',
    data: { id }
  });
  return data;
};

const rejectLeave = async ({ id, remarks }) => {
  const { data } = await apiRequestAxios({
    url: `http://134.209.144.96:8081/superadmin/leave-request/${id}/reject`,
    method: 'PATCH',
    data: { id, remarks }
  });
  return data;
};

function LeaveDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [error, setError] = useState("");

  const { data: leaveRequest, isLoading, isError, error: fetchError } = useQuery({
    queryKey: ["leaveDetails", id],
    queryFn: () => fetchLeaveDetails(id),
  });

  const approveMutation = useMutation({
    mutationFn: approveLeave,
    onSuccess: () => {
      setShowApprovePopup(true);
      queryClient.invalidateQueries(["leaves", "pending"]);
      queryClient.invalidateQueries(["leaves", "history"]);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Failed to approve leave request");
    }
  });

  const rejectMutation = useMutation({
    mutationFn: rejectLeave,
    onSuccess: () => {
      setShowRejectPopup(false);
      queryClient.invalidateQueries(["leaves", "pending"]);
      queryClient.invalidateQueries(["leaves", "history"]);
      navigate(-1);
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Failed to reject leave request");
    }
  });

  // Handle Approve
  const handleApprove = () => {
    setError("");
    approveMutation.mutate(id);
  };

  // Handle Reject
  const handleReject = () => {
    setError("");
    setShowRejectPopup(true);
  };

  // Handle Reject Submit
  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }
    rejectMutation.mutate({ id, remarks: rejectReason });
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load leave details: {fetchError.message}</div>;
  if (!leaveRequest) return <div className="p-4 text-red-500">Leave request not found</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen relative">
      {/* Error Message */}
      {error && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span className="block sm:inline">{error}</span>
          <button onClick={() => setError("")} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <FaTimes />
          </button>
        </div>
      )}

      {/* Approve Success Popup */}
      {showApprovePopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-3 rounded-lg flex items-center border border-gray-300 transition-opacity duration-300">
          <FaCheckCircle className="text-green-600 mr-2" size={20} />
          <div>
            <p className="text-sm font-semibold">Leave approved successfully!</p>
            <p className="text-xs text-gray-500">
              You have successfully approved {leaveRequest.user_id?.name}'s leave.
              Redirecting back to leave list...
            </p>
          </div>
          <button onClick={() => setShowApprovePopup(false)} className="ml-4 text-gray-500">
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* Reject Confirmation Popup */}
      {showRejectPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-md font-bold text-blue-600">Leave Request Rejected</h2>
              <button onClick={() => setShowRejectPopup(false)} className="text-gray-500">
                <FaTimes size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Are you sure you want to reject this leave request? This action cannot be undone.
              Please provide a brief reason for the rejection.
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 text-xs mb-3"
              placeholder="Write here..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-between">
              <button
                onClick={() => setShowRejectPopup(false)}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg mx-1"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={rejectMutation.isLoading}
                className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg mx-1"
              >
                {rejectMutation.isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2 text-2xl text-blue-600">
          <IoArrowBack />
        </button>
        <h1 className="text-lg font-semibold">Leave request details</h1>
      </div>

      {/* User Info */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
        <img 
          src={leaveRequest.user_id?.picture || "https://via.placeholder.com/50"} 
          alt="Profile" 
          className="w-12 h-12 rounded-full mr-3" 
        />
        <div className="flex-grow">
          <h4 className="text-sm font-semibold">{leaveRequest.user_id?.name}</h4>
          <p className="text-xs text-gray-500">{leaveRequest.user_id?.designation?.[0]}</p>
          <p className="text-xs text-gray-500">{leaveRequest.user_id?.campus?.name}</p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
          {leaveRequest.status}
        </span>
      </div>

      {/* Leave Details */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-2">Details</h2>
        <p className="text-xs text-gray-500">Requested on {leaveRequest.request_date}</p>
        <p className="text-sm font-semibold text-blue-600">{leaveRequest.leave_type}</p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
          📅 {leaveRequest.start_date} &nbsp; ⬇️ &nbsp; 📅 {leaveRequest.end_date}
        </div>
      </div>

      {/* Reason */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-2">Reason</h2>
        <p className="text-xs text-gray-500">{leaveRequest.reason}</p>
      </div>

      {/* Additional Information */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-2">Additional Information</h2>
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            <span className="font-semibold">Out of Station:</span> {leaveRequest.out_of_station ? "Yes" : "No"}
          </p>
          {leaveRequest.out_of_station && (
            <p className="text-xs text-gray-500">
              <span className="font-semibold">Address:</span> {leaveRequest.address_out_of_station}
            </p>
          )}
          <p className="text-xs text-gray-500">
            <span className="font-semibold">Contact Number:</span> {leaveRequest.mobile_no_of_contact}
          </p>
          {leaveRequest.child_age > 0 && (
            <p className="text-xs text-gray-500">
              <span className="font-semibold">Child Age:</span> {leaveRequest.child_age}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      {leaveRequest.status === "Pending" && (
        <div className="flex justify-between mt-4">
          <button
            onClick={handleReject}
            className="flex-1 py-2 border border-red-600 text-red-600 rounded-lg mx-1"
          >
            Reject
          </button>
          <button
            onClick={handleApprove}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg mx-1"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
}

export default LeaveDetails;
