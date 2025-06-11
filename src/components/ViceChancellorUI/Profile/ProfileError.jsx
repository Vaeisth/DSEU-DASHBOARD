const ProfileError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Failed to Load Profile
        </h3>
        <p className="text-gray-600">
          Please try again later or contact support if the problem persists.
        </p>
      </div>
    </div>
  );
};

export default ProfileError;
