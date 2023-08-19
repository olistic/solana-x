'use client';

import { useWallet } from '@solana/wallet-adapter-react';

import PostForm from '@/components/post-form';
import PostList from '@/components/post-list';
import ProfileForm from '@/components/profile-form';
import usePosts from '@/hooks/use-posts';
import useProfile from '@/hooks/use-profile';

function NotConnected() {
  const { posts } = usePosts();

  return <PostList posts={posts} />;
}

function NoProfile() {
  return <ProfileForm />;
}

function ConnectedAndProfile() {
  const { posts } = usePosts();

  return (
    <>
      <div className="mb-4">
        <PostForm />
      </div>
      <PostList posts={posts} />
    </>
  );
}

export default function HomePage() {
  const { connected } = useWallet();

  const { loaded, profile } = useProfile();
  const hasProfile = !!profile;

  if (!connected) {
    return <NotConnected />;
  }

  if (connected && loaded && !hasProfile) {
    return <NoProfile />;
  }

  if (connected && loaded && hasProfile) {
    return <ConnectedAndProfile />;
  }

  return null;
}
