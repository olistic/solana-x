import { useContext } from 'react';

import PostsContext from '@/context/posts';

export default function usePosts() {
  const context = useContext(PostsContext);
  if (typeof context === 'undefined') {
    throw new Error('usePosts must be used within a PostsProvider');
  }

  return context;
}
