import { UserProfile, UserSettings } from "@/types";
import { storage, STORAGE_KEYS } from "../models/db";
import { createContext, useContext, ReactNode } from "react";
import { useMMKVObject } from "react-native-mmkv";

interface UserContextType {
  profile: UserProfile;
  settings: UserSettings;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

const initialSettings: UserSettings = {
  darkMode: false,
  notifications: true,
  currency: "USD",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile = {}, setProfile] = useMMKVObject<UserProfile>(
    STORAGE_KEYS.USER
  );
  const [settings = initialSettings, setSettings] = useMMKVObject<UserSettings>(
    STORAGE_KEYS.SETTINGS,
    storage
  );

  const updateProfile = (updatedProfile: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updatedProfile };
    setProfile(newProfile);
  };

  const updateSettings = (updatedSettings: Partial<UserSettings>) => {
    const newSettings = { ...settings, ...updatedSettings };
    setSettings(newSettings);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        settings,
        updateProfile,
        updateSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
