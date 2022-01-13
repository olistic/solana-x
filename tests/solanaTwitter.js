const assert = require('assert');

const anchor = require('@project-serum/anchor');

describe('solana twitter', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.SolanaTwitter;

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

  it('can send a new tweet', async () => {
    // Call the `SendTweet` instruction.
    const tweet = anchor.web3.Keypair.generate();
    await program.rpc.sendTweet('Hummus, am I right?', {
      accounts: {
        tweet: tweet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [tweet],
    });

    // Fetch the account details of the created tweet.
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // Ensure it has the right data.
    assert.equal(
      tweetAccount.author.toBase58(),
      program.provider.wallet.publicKey.toBase58(),
    );
    assert.equal(tweetAccount.content, 'Hummus, am I right?');
    assert.ok(tweetAccount.timestamp);
  });

  it('can send a new tweet from a different author', async () => {
    // Generate another user and airdrop them some SOL.
    const anotherUser = anchor.web3.Keypair.generate();
    const signature = await program.provider.connection.requestAirdrop(
      anotherUser.publicKey,
      1000000000,
    );
    await program.provider.connection.confirmTransaction(signature);

    // Call the `SendTweet` instruction on behalf of this other user.
    const tweet = anchor.web3.Keypair.generate();
    await program.rpc.sendTweet('Yay Tofu!', {
      accounts: {
        tweet: tweet.publicKey,
        author: anotherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [anotherUser, tweet],
    });

    // Fetch the account details of the created tweet.
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    // Ensure it has the right data.
    assert.equal(
      tweetAccount.author.toBase58(),
      anotherUser.publicKey.toBase58(),
    );
    assert.equal(tweetAccount.content, 'Yay Tofu!');
    assert.ok(tweetAccount.timestamp);
  });

  it('cannot provide a content with more than 280 characters', async () => {
    try {
      const tweet = anchor.web3.Keypair.generate();
      const contentWith281Chars = 'x'.repeat(281);
      await program.rpc.sendTweet(contentWith281Chars, {
        accounts: {
          tweet: tweet.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [tweet],
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

  it('can fetch all tweets', async () => {
    const tweetAccounts = await program.account.tweet.all();
    assert.equal(tweetAccounts.length, 2);
  });

  it('can filter tweets by author', async () => {
    const authorPublicKey = program.provider.wallet.publicKey;
    const tweetAccounts = await program.account.tweet.all([
      {
        memcmp: {
          offset: 8, // Discriminator.
          bytes: authorPublicKey.toBase58(),
        },
      },
    ]);

    assert.equal(tweetAccounts.length, 1);
    assert.ok(
      tweetAccounts.every(
        (tweetAccount) =>
          tweetAccount.account.author.toBase58() === authorPublicKey.toBase58(),
      ),
    );
  });
});
