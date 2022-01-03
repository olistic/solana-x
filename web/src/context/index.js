import React from 'react';

import { SolanaConnectionProvider } from './SolanaConnectionContext';

function AppContext({ children }) {
  return <SolanaConnectionProvider>{children}</SolanaConnectionProvider>;
}

export default AppContext;
