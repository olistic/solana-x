import { useContext } from 'react';

import TweetsContext from '../context/TweetsContext';

export default function useTweets() {
  const context = useContext(TweetsContext);
  if (typeof context === 'undefined') {
    throw new Error('useTweets must be used within a TweetsProvider');
  }

  return context;
}
