import { useWallet } from '@solana/wallet-adapter-react';

import MaybeLink from './MaybeLink';
import ProfilePicture from './ProfilePicture';
import useProfile from '../hooks/useProfile';
import { condensePublicKey } from '../utils/publicKeys';
import { styled } from '../stitches.config';

const Row = styled('div', {
  alignItems: 'center',
  display: 'flex',
});

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '$1',
});

const Name = styled('p', {
  fontSize: '$2',
  fontWeight: 600,
  lineHeight: 1,
  margin: '0 0 $1',
});

const PublicKey = styled('p', {
  color: '$gray600',
  fontFamily: '$mono',
  fontSize: '$1',
  lineHeight: 1,
  margin: 0,
});

export default function Profile() {
  const { profile } = useProfile();
  const { publicKey } = useWallet();

  const hasProfile = !!profile;
  if (!hasProfile) {
    return null;
  }

  const { name } = profile;

  return (
    <MaybeLink href="/profile">
      <Row>
        <ProfilePicture publicKey={publicKey} size="sm" />
        <Column>
          <Name>{name}</Name>
          <PublicKey>{condensePublicKey(publicKey.toBase58())}</PublicKey>
        </Column>
      </Row>
    </MaybeLink>
  );
}
