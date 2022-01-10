/* eslint-disable no-console */

const anchor = require('@project-serum/anchor');

const { SystemProgram } = anchor.web3;

const test = async () => {
  console.log('🚀 Starting test...');

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Tutorial;
  const baseAccount = anchor.web3.Keypair.generate();
  const tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log('📝 Your transaction signature', tx);

  await program.rpc.postMessage('This is a test message!', {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });
  const account = await program.account.baseAccount.fetch(
    baseAccount.publicKey,
  );
  console.log('👀 Message list', account.messageList);
};

const runTest = async () => {
  try {
    await test();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runTest();
