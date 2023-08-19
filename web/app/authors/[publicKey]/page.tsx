'use client';

import { PublicKey } from '@solana/web3.js';

import ProfileDetail from '@/components/profile-detail';

export interface AuthorPageParams {
  publicKey: string;
}

export interface AuthorPageProps {
  params: AuthorPageParams;
}

export default function AuthorPage({ params }: AuthorPageProps) {
  // TODO: Handle errors.
  const publicKey = new PublicKey(params.publicKey);

  return <ProfileDetail publicKey={publicKey} />;
}
