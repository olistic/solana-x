import { PublicKey } from '@solana/web3.js';
import { useRouter } from 'next/router';

import Tweet from '../../components/Tweet';

export default function TweetId() {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  const { tweetId } = router.query;
  const tweetPublicKey = new PublicKey(tweetId);

  return <Tweet publicKey={tweetPublicKey} />;
}
