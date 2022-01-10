/* eslint-disable no-console */

const anchor = require('@project-serum/anchor');

const test = async () => {
  console.log('🚀 Starting test...');

  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Tutorial;
  const tx = await program.rpc.initialize();
  console.log('📝 Your transaction signature', tx);
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
