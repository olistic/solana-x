'use client';

import type { PublicKey } from '@solana/web3.js';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

import useWorkspace from '@/hooks/use-workspace';
import type { Post, Profile } from '@/lib/models';
import { authorFilter, fetchPosts, getProfile } from '@/lib/web3';
import type { Workspace } from '@/lib/web3';
import ProfileHeader from './profile-header';
import PostList from './post-list';

export interface ProfileDetailProps {
  publicKey: PublicKey;
}

export default function ProfileDetail({ publicKey }: ProfileDetailProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const [loaded, setLoaded] = useState(false);

  const workspace = useWorkspace();
  useEffect(() => {
    const updateProfile = async (workspace: Workspace) => {
      const fetchedProfile = await getProfile(workspace, publicKey);
      setProfile(fetchedProfile);
    };

    const updatePosts = async (workspace: Workspace) => {
      const fetchedPosts = await fetchPosts(workspace, [
        authorFilter(publicKey),
      ]);
      setPosts(fetchedPosts);
    };

    if (workspace && publicKey) {
      Promise.all([updateProfile(workspace), updatePosts(workspace)]).then(() =>
        setLoaded(true),
      );
    }
  }, [workspace, publicKey]);

  if (!loaded) {
    // TODO: Render spinner.
    return null;
  }

  if (!profile) {
    notFound();
  }

  return (
    <>
      <ProfileHeader profile={profile} />
      <PostList posts={posts} />
    </>
  );
}
