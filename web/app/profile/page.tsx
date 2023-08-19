'use client';

import { useWallet } from '@solana/wallet-adapter-react';

import ProfileDetail from '@/components/profile-detail';

export default function ProfilePage() {
  const { publicKey } = useWallet();

  return <ProfileDetail publicKey={publicKey!} />;
}
