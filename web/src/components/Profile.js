import React from 'react';

import Avatar from './Avatar';
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

const PublicKey = styled('p', {
  fontFamily: '$mono',
  fontSize: '$1',
  lineHeight: 1,
  margin: 0,
});

function Profile() {
  const { publicKey } = useWallet();

  return (
    <Row>
      <Avatar id={publicKey.toBase58()} size="sm" />
      <Column>
        <PublicKey>{condensePublicKey(publicKey.toBase58())}</PublicKey>
      </Column>
    </Row>
  );
}

export default Profile;
