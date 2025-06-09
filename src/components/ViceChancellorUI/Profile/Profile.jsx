import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequestAxios } from "../../../utils/api";
import { API_ENDPOINTS } from "../../../config/api.config";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaUserTie,
  FaBuilding,
  FaUniversity,
  FaCreditCard,
} from "react-icons/fa";
import { Edit, Loader, LoaderCircle } from "lucide-react";
import { updateProfileImage } from "../../../utils/apiservice";
import toast from "react-hot-toast";
import { useRef } from "react";
import ProfileLoading from "./ProfileLoading";
import ProfileError from "./ProfileError";
import { showSuccessToast } from "@/utils/toasts.js";
import { useProfileContext } from "../../../contexts/ProfileContext.jsx";
import placeholder from "../../../assets/placeholder-pfp.jpg";

const fetchProfile = async () => {
  try {
    const response = await apiRequestAxios({
      endpoint: API_ENDPOINTS.PROFILE,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};

const Profile = () => {
  const {
    data: userData,
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
  });

  const role = sessionStorage.getItem("currentRole");
  const fileInputRef = useRef(null);
  const { setIsProfileLoading } = useProfileContext();

  const imageMutation = useMutation({
    mutationFn: async (formData) => {
      return updateProfileImage(formData);
    },
    onSuccess: () => {
      showSuccessToast("Image updated sucessfully!");
      setIsProfileLoading(true);
    },
    onError: () => {
      toast("Error while uploading the image");
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log(file);

    imageMutation.mutate(formData);
  };

  if (profileLoading) return <ProfileLoading />;
  if (profileError) return <ProfileError />;
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h2 className="text-xl font-bold text-gray-800">Profile</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
              <div className="px-6 pb-6">
                {/* IMAGE + EDIT */}
                <div className="flex justify-center">
                  <div className="relative -mt-16 group w-32 h-32">
                    <img
                      src={userData.picture || placeholder}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />

                    {/* Image edit/loading thingy */}

                    {role != "inventory_admin" && (
                      <div
                        className={`absolute inset-0 bg-black/60 rounded-full flex items-center justify-center ${
                          !imageMutation.isPending
                            ? "opacity-0 group-hover:opacity-100"
                            : "opacity-100"
                        } transition-opacity cursor-pointer`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {!imageMutation.isPending ? (
                          <Edit className="text-white h-9 w-9 opacity-75" />
                        ) : (
                          <LoaderCircle className="text-white h-9 w-9 opacity-90 animate-spin" />
                        )}
                      </div>
                    )}

                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {userData.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {userData.designation?.join(", ") || "No Designation"}
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-center text-gray-600">
                      <FaUniversity className="mr-2" />
                      <span>{userData.campus?.name || "Unknown Campus"}</span>
                    </div>
                    <div className="flex items-center justify-center text-gray-600">
                      <FaUserTie className="mr-2" />
                      <span className="capitalize">
                        {userData.staff_type || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-sm mt-8 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="w-5 h-5 mr-3 text-blue-500" />
                  <a
                    href={`mailto:${userData.email}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {userData.email}
                  </a>
                </div>
                {userData.phone && (
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{userData.phone}</span>
                  </div>
                )}
                {userData.address && (
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{userData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Information Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaIdCard className="mr-2 text-blue-500" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-800 font-medium">{userData.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Gender
                  </label>
                  <p className="text-gray-800 font-medium capitalize">
                    {userData.gender || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Date of Birth
                  </label>
                  <p className="text-gray-800 font-medium">
                    {userData.dob || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Email
                  </label>
                  <p className="text-gray-800 font-medium">{userData.email}</p>
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaBuilding className="mr-2 text-blue-500" />
                Work Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Date of Joining
                  </label>
                  <p className="text-gray-800 font-medium">
                    {userData.date_of_joining || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Staff Type
                  </label>
                  <p className="text-gray-800 font-medium capitalize">
                    {userData.staff_type || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Campus
                  </label>
                  <p className="text-gray-800 font-medium">
                    {userData.campus?.name || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Designation
                  </label>
                  <p className="text-gray-800 font-medium">
                    {userData.designation?.join(", ") || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaCreditCard className="mr-2 text-blue-500" />
                Bank Details
              </h3>
              <div className="text-center py-8">
                <p className="text-gray-500 italic">
                  Bank details are currently unavailable
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Please contact the administration for assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
