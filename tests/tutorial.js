const assert = require('assert');

const anchor = require('@project-serum/anchor');

describe('tutorial', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.Tutorial;

  it('can create a new profile', async () => {
    // Call the `CreateProfile` instruction.
    const profile = anchor.web3.Keypair.generate();
    await program.rpc.createProfile('Adam', {
      accounts: {
        profile: profile.publicKey,
        owner: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [profile],
    });

    // Fetch the account details of the created profile.
    const profileAccount = await program.account.profile.fetch(
      profile.publicKey,
    );

    // Ensure it has the right data.
    assert.equal(
      profileAccount.owner.toBase58(),
      program.provider.wallet.publicKey.toBase58(),
    );
    assert.equal(profileAccount.name, 'Adam');
  });

  it('can fetch a profile by owner', async () => {
    const ownerPublicKey = program.provider.wallet.publicKey;
    const profileAccounts = await program.account.profile.all([
      {
        memcmp: {
          offset: 8, // Discriminator.
          bytes: ownerPublicKey.toBase58(),
        },
      },
    ]);

    assert.equal(profileAccounts.length, 1);
    assert.ok(
      profileAccounts.every(
        (profileAccount) =>
          profileAccount.account.owner.toBase58() === ownerPublicKey.toBase58(),
      ),
    );
  });

  it('can post a new message', async () => {
    // Call the `PostMessage` instruction.
    const message = anchor.web3.Keypair.generate();
    await program.rpc.postMessage('Hummus, am I right?', {
      accounts: {
        message: message.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [message],
    });

    // Fetch the account details of the created message.
    const messageAccount = await program.account.message.fetch(
      message.publicKey,
    );

    // Ensure it has the right data.
    assert.equal(
      messageAccount.author.toBase58(),
      program.provider.wallet.publicKey.toBase58(),
    );
    assert.equal(messageAccount.content, 'Hummus, am I right?');
    assert.ok(messageAccount.timestamp);
  });

  it('can post a new message from a different author', async () => {
    // Generate another user and airdrop them some SOL.
    const anotherUser = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(
      anotherUser.publicKey,
      1000000000,
    );
    await program.provider.connection.confirmTransaction(signature);

    // Call the `PostMessage` instruction on behalf of this other user.
    const message = anchor.web3.Keypair.generate();
    await program.rpc.postMessage('Yay Tofu!', {
      accounts: {
        message: message.publicKey,
        author: anotherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [anotherUser, message],
    });

    // Fetch the account details of the created message.
    const messageAccount = await program.account.message.fetch(
      message.publicKey,
    );

    // Ensure it has the right data.
    assert.equal(
      messageAccount.author.toBase58(),
      anotherUser.publicKey.toBase58(),
    );
    assert.equal(messageAccount.content, 'Yay Tofu!');
    assert.ok(messageAccount.timestamp);
  });

  it('cannot provide a content with more than 280 characters', async () => {
    try {
      const message = anchor.web3.Keypair.generate();
      const contentWith281Chars = 'x'.repeat(281);
      await program.rpc.postMessage(contentWith281Chars, {
        accounts: {
          message: message.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [message],
      });
    } catch (error) {
      assert.equal(
        error.msg,
        'The provided content should be 280 characters long maximum.',
      );
      return;
    }
    assert.fail(
      'The instruction should have failed with a 281-character content.',
    );
  });

  it('can fetch all messages', async () => {
    const messageAccounts = await program.account.message.all();
    assert.equal(messageAccounts.length, 2);
  });

  it('can filter messages by author', async () => {
    const authorPublicKey = program.provider.wallet.publicKey;
    const messageAccounts = await program.account.message.all([
      {
        memcmp: {
          offset: 8, // Discriminator.
          bytes: authorPublicKey.toBase58(),
        },
      },
    ]);

    assert.equal(messageAccounts.length, 1);
    assert.ok(
      messageAccounts.every(
        (messageAccount) =>
          messageAccount.account.author.toBase58() ===
          authorPublicKey.toBase58(),
      ),
    );
  });
});
