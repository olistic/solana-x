import { useWallet } from '@solana/wallet-adapter-react';

import useProfile from '@/hooks/use-profile';
import { condensePublicKey } from '@/lib/utils/public-keys';
import MaybeLink from './maybe-link';
import ProfilePicture from './profile-picture';

export default function Wallet() {
  const { profile } = useProfile();
  const { publicKey } = useWallet();

  const hasProfile = !!profile;
  if (!hasProfile) {
    return null;
  }

  const { name } = profile;

  return (
    <MaybeLink href="/profile">
      <div className="flex items-center">
        <ProfilePicture className="h-10 w-10" publicKey={publicKey!} />
        <div className="ml-2 flex flex-col">
          <p className="mx-0 mb-2 mt-0 font-semibold leading-none">{name}</p>
          <p className="m-0 font-mono text-sm leading-4 text-neutral-500">
            {condensePublicKey(publicKey!.toBase58())}
          </p>
        </div>
      </div>
    </MaybeLink>
  );
}
