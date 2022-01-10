import React from 'react';

import Button from './Button';
import usePhantomWallet from '../hooks/usePhantomWallet';
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

function Header() {
  const { connectWallet, isWalletConnected } = usePhantomWallet();

  return (
    <StyledHeader>
      <div>
        <Heading>Solana Message Wall</Heading>
      </div>
      <div>
        {!isWalletConnected && (
          <Button onClick={connectWallet} type="button">
            Connect Wallet
          </Button>
        )}
      </div>
    </StyledHeader>
  );
}

export default Header;
