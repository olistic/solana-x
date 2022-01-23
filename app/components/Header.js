import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

import Link from './Link';
import Profile from './Profile';
import { styled } from '../stitches.config';

const StyledHeader = styled('header', {
  alignItems: 'center',
  display: 'flex',
  height: '$10',
  justifyContent: 'space-between',
  padding: '$2 $4',
});

const Heading = styled('h1', {
  fontSize: '$5',
  lineHeight: 1,
  margin: 0,
});

export default function Header() {
  const { connected } = useWallet();

  return (
    <StyledHeader>
      <Heading>
        <Link href="/">solana twitter</Link>
      </Heading>
      {connected ? <Profile /> : <WalletMultiButton />}
    </StyledHeader>
  );
}
