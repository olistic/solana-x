import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useWallet from '../hooks/useWallet';
import useWorkspace from '../hooks/useWorkspace';
import { createProfile, fetchProfile } from '../api';

const ProfileContext = React.createContext();

export function ProfileProvider({ children }) {
  const [loaded, setLoaded] = useState(false);

  const [profile, setProfile] = useState(null);

  const workspace = useWorkspace();

  // Update profile on workspace changes.
  const { connected } = useWallet();
  useEffect(() => {
    const updateProfile = async () => {
      setProfile(await fetchProfile(workspace));
      setLoaded(true);
    };

    if (connected) {
      updateProfile();
    } else {
      setProfile(null);
    }
  }, [connected, workspace]);

  const createAndUpdateProfile = useCallback(
    async (name) => {
      const newProfile = await createProfile(workspace, name);
      setProfile(newProfile);
    },
    [workspace],
  );

  const value = useMemo(
    () => ({
      loaded,
      profile,
      createProfile: createAndUpdateProfile,
    }),
    [loaded, profile, createAndUpdateProfile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContext;
