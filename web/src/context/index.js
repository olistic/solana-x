import React from 'react';
import { SolanaConnectionProvider } from './SolanaConnectionContext';

const AppContext = ({ children }) => (
  <SolanaConnectionProvider>{children}</SolanaConnectionProvider>
);

export default AppContext;
