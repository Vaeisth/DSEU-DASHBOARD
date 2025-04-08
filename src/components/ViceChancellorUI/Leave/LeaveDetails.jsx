import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

function LeaveDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Sample leave request data
  const leaveRequest = {
    name: "XYZ",
    role: "Designation Name",
    campus: "Campus name",
    leaveDays: "1 Day off",
    leaveType: "Casual leave",
    requestedDate: "15 May 24",
    startDate: "24 May 24",
    endDate: "24 May 24",
    status: "Pending Approval",
    reason: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    scheduleLeave: "4/20",
    casualLeave: "1/7",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  };

  // Handle Approve
  const handleApprove = () => {
    setShowApprovePopup(true);
    setTimeout(() => {
      setShowApprovePopup(false);
    }, 3000);
  };

  // Handle Reject
  const handleReject = () => {
    setShowRejectPopup(true);
  };

  // Handle Reject Submit
  const handleRejectSubmit = () => {
    console.log("Rejected with reason:", rejectReason);
    setShowRejectPopup(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen relative">
      {/* Approve Success Popup */}
      {showApprovePopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-3 rounded-lg flex items-center border border-gray-300 transition-opacity duration-300">
          <FaCheckCircle className="text-green-600 mr-2" size={20} />
          <div>
            <p className="text-sm font-semibold">Leave approved successfully!</p>
            <p className="text-xs text-gray-500">
              You have successfully approved {leaveRequest.name}'s leave.
              Later you can see this request in leave history.
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
                className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg mx-1"
              >
                Submit
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
        <img src={leaveRequest.image} alt="Profile" className="w-12 h-12 rounded-full mr-3" />
        <div className="flex-grow">
          <h4 className="text-sm font-semibold">{leaveRequest.name}</h4>
          <p className="text-xs text-gray-500">{leaveRequest.role}</p>
          <p className="text-xs text-gray-500">{leaveRequest.campus}</p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
          {leaveRequest.status}
        </span>
      </div>

      {/* Leave Details */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-2">Details</h2>
        <p className="text-xs text-gray-500">Requested on {leaveRequest.requestedDate}</p>
        <p className="text-sm font-semibold text-blue-600">{leaveRequest.leaveDays} · {leaveRequest.leaveType}</p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
          📅 {leaveRequest.startDate} &nbsp; ⬇️ &nbsp; 📅 {leaveRequest.endDate}
        </div>
      </div>

      {/* Reason */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-2">Reason</h2>
        <p className="text-xs text-gray-500">{leaveRequest.reason}</p>
      </div>

      {/* Employee Leave Balance */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-2">Employee leave balance</h2>
        <div className="flex gap-4">
          <div className="flex-1 bg-blue-100 p-3 rounded-lg text-center">
            <p className="text-lg font-bold">{leaveRequest.scheduleLeave}</p>
            <p className="text-xs text-gray-500">Schedule leave</p>
          </div>
          <div className="flex-1 bg-yellow-100 p-3 rounded-lg text-center">
            <p className="text-lg font-bold">{leaveRequest.casualLeave}</p>
            <p className="text-xs text-gray-500">Casual leave</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
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
    </div>
  );
}

export default LeaveDetails;
