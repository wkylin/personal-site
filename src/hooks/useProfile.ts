import { useEffect, useState } from "react";
import { profileData, type ProfileData } from "../profileData";

const shouldFetchProfile = import.meta.env.VITE_USE_PROFILE_API === "true";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(profileData);

  useEffect(() => {
    if (!shouldFetchProfile) {
      return;
    }

    fetch("/api/profile")
      .then((response) => (response.ok ? response.json() : profileData))
      .then((data) => setProfile(data))
      .catch(() => setProfile(profileData));
  }, []);

  return profile;
}

