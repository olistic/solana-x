'use client';

import { PublicKey } from '@solana/web3.js';

import Post from '@/components/post-detail';

export interface PostPageParams {
  publicKey: string;
}

export interface PostPageProps {
  params: PostPageParams;
}

export default function PostPage({ params }: PostPageProps) {
  // TODO: Handle errors.
  const publicKey = new PublicKey(params.publicKey);

  return <Post publicKey={publicKey} />;
}
