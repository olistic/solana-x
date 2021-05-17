import { useContext } from 'react';

import SolanaConnectionContext from '../context/SolanaConnectionContext';

const useSolanaConnection = () => {
  const context = useContext(SolanaConnectionContext);
  if (typeof context === 'undefined') {
    throw new Error(
      'useSolanaConnection must be used within a SolanaConnectionProvider',
    );
  }

  return context;
};

export default useSolanaConnection;
