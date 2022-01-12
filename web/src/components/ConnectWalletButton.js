import React from 'react';

import Button from './Button';
import useWallet from '../hooks/useWallet';

function ConnectWalletButton() {
  const { connect } = useWallet();

  return (
    <Button onClick={connect} type="button">
      Connect Wallet
    </Button>
  );
}

export default ConnectWalletButton;
