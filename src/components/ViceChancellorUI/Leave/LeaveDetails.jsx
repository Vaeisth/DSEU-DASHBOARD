import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import {
  FaCheckCircle,
  FaTimes,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveLeave,
  fetchLeaveDetails,
  rejectLeave,
} from "../../../utils/apiservice";
import { format } from "date-fns";
import { showSuccessToast, showErrorToast } from "../../../utils/toasts";

function LeaveDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [error, setError] = useState("");

  const {
    data: leaveRequest,
    isLoading,
    isError,
    error: fetchError,
  } = useQuery({
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
      showSuccessToast("Leave Approved");
    },

    onError: (error) => {
      setError(
        error.response?.data?.message || "Failed to approve leave request"
      );
      showErrorToast("Failed to approve leave request");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectLeave,
    onSuccess: () => {
      setShowRejectPopup(false);
      queryClient.invalidateQueries(["leaves", "pending"]);
      queryClient.invalidateQueries(["leaves", "history"]);
      navigate(-1);
      showSuccessToast("Leave Rejected");
    },
    onError: (error) => {
      setError(
        error.response?.data?.message || "Failed to reject leave request"
      );
      console.error(error);
      showErrorToast("Failed to reject leave request");
    },
  });

  const handleApprove = () => {
    setError("");
    approveMutation.mutate(id);
  };

  const handleReject = () => {
    setError("");
    setShowRejectPopup(true);
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      setError("Please provide a reason for rejection");
      showErrorToast("Please provide a reason for rejection!");
      return;
    }
    rejectMutation.mutate({ id, remarks: rejectReason });
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading leave details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaTimes className="text-red-500 text-4xl mx-auto mb-4" />
          <p className="text-red-500">
            Failed to load leave details: {fetchError.message}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!leaveRequest) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-4" />
          <p className="text-gray-500">Leave request not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Approve Success Popup */}
      {showApprovePopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-lg border border-green-200 z-50">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-3" size={24} />
            <div>
              <p className="font-semibold text-gray-900">
                Leave approved successfully!
              </p>
              <p className="text-sm text-gray-500">
                Redirecting back to leave list...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Popup */}
      {showRejectPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Reject Leave Request
              </h2>
              <button
                onClick={() => setShowRejectPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting this leave request. This
              will be visible to the employee.
            </p>
            <textarea
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowRejectPopup(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={rejectMutation.isLoading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {rejectMutation.isLoading
                  ? "Submitting..."
                  : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <IoArrowBack className="text-2xl text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Leave Request Details
          </h1>
          <p className="text-gray-500 mt-1">Review and manage leave request</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Employee Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Employee Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-4">
              <img
                src={
                  leaveRequest.user_id?.picture ||
                  "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {leaveRequest.user_id?.name}
                </h3>
                <p className="text-gray-500">
                  {leaveRequest.user_id?.designation?.[0]}
                </p>
                <div className="flex items-center text-gray-500 mt-1">
                  <FaBuilding className="mr-2" />
                  <span>{leaveRequest.user_id?.campus?.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <FaPhone className="mr-3 text-gray-400 rotate-90" />
                <span>{leaveRequest.mobile_no_of_contact}</span>
              </div>
              {leaveRequest.out_of_station && (
                <div className="flex items-start text-gray-600">
                  <FaMapMarkerAlt className="mr-3 text-gray-400 mt-1" />
                  <span>{leaveRequest.address_out_of_station}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Leave Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Leave Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Leave Details
                </h3>
                <p className="text-gray-500 mt-1">
                  Requested on{" "}
                  {format(new Date(leaveRequest.request_date), "MMMM dd, yyyy")}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  leaveRequest.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : leaveRequest.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {leaveRequest.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Leave Type</label>
                  <p className="font-medium text-gray-900">
                    {leaveRequest.leave_type}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Start Date</label>
                  <p className="font-medium text-gray-900">
                    {format(new Date(leaveRequest.start_date), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Duration</label>
                  <p className="font-medium text-gray-900">
                    {(() => {
                      const days =
                        Math.ceil(
                          (new Date(leaveRequest.end_date) -
                            new Date(leaveRequest.start_date)) /
                            (1000 * 60 * 60 * 24)
                        ) + 1;
                      return `${days} ${days === 1 ? "Day" : "Days"}`;
                    })()}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">End Date</label>
                  <p className="font-medium text-gray-900">
                    {format(new Date(leaveRequest.end_date), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reason Card */}
          {leaveRequest.reason && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reason for Leave
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {leaveRequest.reason}
              </p>
            </div>
          )}

          {leaveRequest.remarks && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Remarks
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {leaveRequest.remarks}
              </p>
            </div>
          )}

          {/* Additional Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Out of Station</label>
                <p className="font-medium text-gray-900">
                  {leaveRequest.out_of_station ? "Yes" : "No"}
                </p>
              </div>
              {leaveRequest.child_age > 0 && (
                <div>
                  <label className="text-sm text-gray-500">Child Age</label>
                  <p className="font-medium text-gray-900">
                    {leaveRequest.child_age} years
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {leaveRequest.status === "Pending" && sessionStorage.getItem("currentRole") !== "employee" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex justify-end gap-4">
            <button
              onClick={handleReject}
              className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 transition-colors cursor-pointer hover:text-white/90 hover:shadow-sm hover:shadow-red-500"
            >
              Reject
            </button>
            <button
              onClick={handleApprove}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-white transition-colors cursor-pointer hover:border-green-500 hover:border-2 hover:shadow-sm hover:shadow-green-500 hover:text-green-700"
            >
              Approve
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveDetails;
