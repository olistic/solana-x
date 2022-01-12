import { useContext } from 'react';

import MessagesContext from '../context/MessagesContext';

export default function useMessages() {
  const context = useContext(MessagesContext);
  if (typeof context === 'undefined') {
    throw new Error('useMessages must be used within a MessagesProvider');
  }

  return context;
}
