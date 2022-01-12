import React from 'react';

import Avatar from './Avatar';
import useProfile from '../hooks/useProfile';
import useWallet from '../hooks/useWallet';
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
  fontFamily: '$mono',
  fontSize: '$1',
  lineHeight: 1,
  margin: 0,
});

function Profile() {
  const { profile } = useProfile();
  const hasProfile = !!profile;
  const { publicKey } = useWallet();

  if (!hasProfile) {
    return null;
  }

  const { name } = profile;

  return (
    <Row>
      <Avatar id={name} size="sm" />
      <Column>
        <Name>{name}</Name>
        <PublicKey>{condensePublicKey(publicKey.toBase58())}</PublicKey>
      </Column>
    </Row>
  );
}

export default Profile;
