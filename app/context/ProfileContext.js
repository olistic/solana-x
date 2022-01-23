import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import useWorkspace from '../hooks/useWorkspace';
import { createProfile, getProfile } from '../client';

const ProfileContext = React.createContext();

export function ProfileProvider({ children }) {
  const [loaded, setLoaded] = useState(false);

  const [profile, setProfile] = useState(null);

  const workspace = useWorkspace();

  // Update profile on workspace changes.
  const { publicKey } = useWallet();
  useEffect(() => {
    const updateProfile = async () => {
      setProfile(await getProfile(workspace, publicKey));
      setLoaded(true);
    };

    const clearProfile = () => {
      setProfile(null);
    };

    if (publicKey) {
      updateProfile();
    } else {
      clearProfile();
    }
  }, [workspace, publicKey]);

  const createProfileAndUpdate = useCallback(
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
      createProfile: createProfileAndUpdate,
    }),
    [loaded, profile, createProfileAndUpdate],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContext;
