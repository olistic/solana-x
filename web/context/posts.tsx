'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import invariant from 'tiny-invariant';

import useWorkspace from '@/hooks/use-workspace';
import type { Post } from '@/lib/models';
import type { Workspace } from '@/lib/web3';
import { fetchPosts, sendPost } from '@/lib/web3';

export interface PostsContextValue {
  posts: Post[];
  sendPost: (content: string) => Promise<void>;
}

const defaultValue: PostsContextValue = {
  posts: [],
  sendPost: async () => {},
};

const PostsContext = React.createContext<PostsContextValue>(defaultValue);

export interface PostsProviderProps {
  children: React.ReactNode;
}

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  const workspace = useWorkspace();

  // Update posts on workspace changes.
  useEffect(() => {
    const updatePosts = async (workspace: Workspace) => {
      const fetchedPosts = await fetchPosts(workspace);
      const sortedPosts = fetchedPosts.sort(
        (a, b) => b.timestamp - a.timestamp,
      );
      setPosts(sortedPosts);
    };

    if (workspace) {
      updatePosts(workspace);
    }
  }, [workspace]);

  const sendPostAndUpdate = useCallback(
    async (content: string) => {
      invariant(workspace, 'Expected workspace to be defined');
      const newPost = await sendPost(workspace, content);
      setPosts([newPost, ...posts]);
    },
    [workspace, posts],
  );

  const value = useMemo(
    () => ({
      posts,
      sendPost: sendPostAndUpdate,
    }),
    [posts, sendPostAndUpdate],
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export default PostsContext;
