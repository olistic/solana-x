import { PublicKey } from '@solana/web3.js';
import { useRouter } from 'next/router';

import Author from '../../components/Author';

export default function AuthorId() {
  const router = useRouter();
  const { authorId } = router.query;

  const authorPublicKey = new PublicKey(authorId);

  return <Author publicKey={authorPublicKey} />;
}
