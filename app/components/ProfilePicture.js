import { getProfilePicture } from '@solflare-wallet/pfp';
import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

import { styled } from '../stitches.config';

const StyledImg = styled('img', {
  variants: {
    size: {
      sm: {
        size: '$5',
      },
      md: {
        size: '$7',
      },
      lg: {
        size: '$9',
      },
    },
  },
});

export default function ProfilePicture({ publicKey, size = 'md' }) {
  const [src, setSrc] = useState(null);

  const { connection } = useConnection();
  useEffect(() => {
    const updateProfilePicture = async () => {
      const { url } = await getProfilePicture(connection, publicKey);
      setSrc(url);
    };
    updateProfilePicture();
  }, [connection, publicKey]);

  return <StyledImg alt="" src={src} size={size} />;
}
