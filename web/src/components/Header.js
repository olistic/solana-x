import React from 'react';

import ConnectWalletButton from './ConnectWalletButton';
import Link from './Link';
import Profile from './Profile';
import useWallet from '../hooks/useWallet';
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
  const { connected } = useWallet();

  return (
    <StyledHeader>
      <Heading>
        <Link to="/">Solana Twitter</Link>
      </Heading>
      {connected ? <Profile /> : <ConnectWalletButton />}
    </StyledHeader>
  );
}

export default Header;
