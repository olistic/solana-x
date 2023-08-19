import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { assert } from 'chai';

import { SolanaX } from '../target/types/solana_x';

describe('solana-x', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaX as Program<SolanaX>;

  it('can create a new profile', async () => {
    const owner = (program.provider as anchor.AnchorProvider).wallet;
    const ownerPublicKey = owner.publicKey;
    const [profilePDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('profile'), ownerPublicKey.toBuffer()],
      program.programId,
    );

    await program.methods
      .createProfile('Adam')
      .accounts({
        owner: ownerPublicKey,
        profile: profilePDA,
      })
      .rpc();

    const profileAccount = await program.account.profile.fetch(profilePDA);
    assert.equal(profileAccount.owner.toBase58(), ownerPublicKey.toBase58());
    assert.equal(profileAccount.name, 'Adam');
  });

  it('cannot provide a name with more than 50 characters', async () => {
    try {
      const anotherUser = anchor.web3.Keypair.generate();
      const airdropSignature = await program.provider.connection.requestAirdrop(
        anotherUser.publicKey,
        1000000000,
      );
      const { blockhash, lastValidBlockHeight } =
        await program.provider.connection.getLatestBlockhash();
      await program.provider.connection.confirmTransaction({
        blockhash: blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
        signature: airdropSignature,
      });
      const anotherUserPublicKey = anotherUser.publicKey;
      const [profilePDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode('profile'),
          anotherUserPublicKey.toBuffer(),
        ],
        program.programId,
      );

      const nameWith51Chars = 'x'.repeat(51);
      await program.methods
        .createProfile(nameWith51Chars)
        .accounts({
          owner: anotherUserPublicKey,
          profile: profilePDA,
        })
        .signers([anotherUser])
        .rpc();

      assert.fail(
        'The instruction should have failed with a 51-character name',
      );
    } catch (error) {
      assert.isTrue(error instanceof anchor.AnchorError);
      assert.equal(
        error.error.errorMessage,
        'The provided name should be 50 characters long maximum',
      );
    }
  });

  it('can get a profile by owner', async () => {
    const owner = (program.provider as anchor.AnchorProvider).wallet;
    const ownerPublicKey = owner.publicKey;
    const [profilePDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('profile'), ownerPublicKey.toBuffer()],
      program.programId,
    );

    const profileAccount = await program.account.profile.fetch(profilePDA);

    assert.equal(profileAccount.owner.toBase58(), ownerPublicKey.toBase58());
  });

  it('can send a new post', async () => {
    const author = (program.provider as anchor.AnchorProvider).wallet;
    const authorPublicKey = author.publicKey;
    const post = anchor.web3.Keypair.generate();

    await program.methods
      .sendPost('Hummus, am I right?')
      .accounts({
        author: authorPublicKey,
        post: post.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([post])
      .rpc();

    const postAccount = await program.account.post.fetch(post.publicKey);
    assert.equal(postAccount.author.toBase58(), authorPublicKey.toBase58());
    assert.equal(postAccount.content, 'Hummus, am I right?');
    assert.ok(postAccount.timestamp);
  });

  it('can send a new post from a different author', async () => {
    const anotherUser = anchor.web3.Keypair.generate();
    const airdropSignature = await program.provider.connection.requestAirdrop(
      anotherUser.publicKey,
      1000000000,
    );
    const { blockhash, lastValidBlockHeight } =
      await program.provider.connection.getLatestBlockhash();
    await program.provider.connection.confirmTransaction({
      blockhash: blockhash,
      lastValidBlockHeight: lastValidBlockHeight,
      signature: airdropSignature,
    });

    const post = anchor.web3.Keypair.generate();
    await program.methods
      .sendPost('Yay Tofu!')
      .accounts({
        author: anotherUser.publicKey,
        post: post.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([anotherUser, post])
      .rpc();

    const postAccount = await program.account.post.fetch(post.publicKey);
    assert.equal(
      postAccount.author.toBase58(),
      anotherUser.publicKey.toBase58(),
    );
    assert.equal(postAccount.content, 'Yay Tofu!');
    assert.ok(postAccount.timestamp);
  });

  it('cannot provide a content with more than 280 characters', async () => {
    try {
      const author = (program.provider as anchor.AnchorProvider).wallet;
      const authorPublicKey = author.publicKey;
      const post = anchor.web3.Keypair.generate();

      const contentWith281Chars = 'x'.repeat(281);
      await program.methods
        .sendPost(contentWith281Chars)
        .accounts({
          author: authorPublicKey,
          post: post.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([post])
        .rpc();

      assert.fail(
        'The instruction should have failed with a 281-character content',
      );
    } catch (error) {
      assert.isTrue(error instanceof anchor.AnchorError);
      assert.equal(
        error.error.errorMessage,
        'The provided content should be 280 characters long maximum',
      );
    }
  });

  it('can fetch all posts', async () => {
    const postAccounts = await program.account.post.all();

    assert.equal(postAccounts.length, 2);
  });

  it('can filter posts by author', async () => {
    const author = (program.provider as anchor.AnchorProvider).wallet;
    const authorPublicKey = author.publicKey;

    const postAccounts = await program.account.post.all([
      {
        memcmp: {
          offset: 8, // Discriminator.
          bytes: authorPublicKey.toBase58(),
        },
      },
    ]);

    assert.equal(postAccounts.length, 1);
    assert.ok(
      postAccounts.every(
        (postAccount) =>
          postAccount.account.author.toBase58() === authorPublicKey.toBase58(),
      ),
    );
  });
});
