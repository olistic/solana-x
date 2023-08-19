import { useContext } from 'react';

import ProfileContext from '@/context/profile';

export default function useProfile() {
  const context = useContext(ProfileContext);
  if (typeof context === 'undefined') {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
}
