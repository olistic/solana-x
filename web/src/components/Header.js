import React from 'react';

import Button from './Button';
import useWallet from '../hooks/useWallet';
import useWorkspace from '../hooks/useWorkspace';
import { condensePublicKey } from '../utils/publicKeys';
import { styled } from '../stitches.config';

const StyledHeader = styled('header', {
  alignItems: 'center',
  display: 'flex',
  height: '$10',
  justifyContent: 'space-between',
  padding: '$2 $4',
});

const Heading = styled('h1', {
  fontSize: '$6',
  lineHeight: 1,
  margin: 0,
  textTransform: 'lowercase',
});

const PublicKey = styled('p', {
  fontFamily: '$mono',
  fontSize: '$1',
  lineHeight: 1,
  margin: 0,
});

function Header() {
  const { connect, connected } = useWallet();
  const { wallet } = useWorkspace();

  return (
    <StyledHeader>
      <div>
        <Heading>Solana Message Wall</Heading>
      </div>
      <div>
        {connected ? (
          <PublicKey>
            {condensePublicKey(wallet.publicKey.toBase58())}
          </PublicKey>
        ) : (
          <Button onClick={connect} type="button">
            Connect Wallet
          </Button>
        )}
      </div>
    </StyledHeader>
  );
}

export default Header;
