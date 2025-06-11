import { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isProfileLoading) {
      queryClient.invalidateQueries({ queryKey: ["profile"] }).then(() => {
        setIsProfileLoading(false);
      });
    }
  }, [isProfileLoading, queryClient]);


  return (
    <ProfileContext.Provider value={{ isProfileLoading, setIsProfileLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
