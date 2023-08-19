import * as anchor from '@coral-xyz/anchor';
import type { AnchorProvider, Program } from '@coral-xyz/anchor';
import type { AnchorWallet } from '@solana/wallet-adapter-react';
import type {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
} from '@solana/web3.js';

import { SolanaX } from '@/lib/idl/solana_x';
import { Post, Profile } from '@/lib/models';

export interface Workspace {
  connection: Connection;
  provider: AnchorProvider;
  program: Program<SolanaX>;
  wallet: AnchorWallet;
}

const getProfilePDA = (
  workspace: Workspace,
  ownerPublicKey: PublicKey,
): PublicKey => {
  const { program } = workspace;
  const [profilePDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode('profile'), ownerPublicKey.toBuffer()],
    program.programId,
  );
  return profilePDA;
};

type ProfileAccount = Awaited<
  ReturnType<Workspace['program']['account']['profile']['fetch']>
>;

const buildProfile = async (
  workspace: Workspace,
  publicKey: PublicKey,
  profileAccount: ProfileAccount,
): Promise<Profile> => {
  const { owner, name } = profileAccount;
  return new Profile(publicKey, owner, name);
};

export const getProfile = async (
  workspace: Workspace,
  ownerPublicKey: PublicKey,
) => {
  const { program } = workspace;

  const profilePDA = await getProfilePDA(workspace, ownerPublicKey);

  const profileAccount = await program.account.profile.fetchNullable(
    profilePDA,
  );
  if (!profileAccount) {
    return null;
  }

  return buildProfile(workspace, profilePDA, profileAccount);
};

export const createProfile = async (
  workspace: Workspace,
  name: string,
): Promise<Profile> => {
  const { wallet, program } = workspace;

  const ownerPublicKey = wallet!.publicKey;

  const profilePDA = await getProfilePDA(workspace, ownerPublicKey);

  // TODO: Handle errors.
  await program.methods
    .createProfile(name)
    .accounts({
      owner: ownerPublicKey,
      profile: profilePDA,
    })
    .rpc();

  const profileAccount = await program.account.profile.fetch(profilePDA);
  return buildProfile(workspace, profilePDA, profileAccount);
};

type PostAccount = Awaited<
  ReturnType<Workspace['program']['account']['post']['fetch']>
>;

const buildPost = async (
  workspace: Workspace,
  publicKey: PublicKey,
  postAccount: PostAccount,
): Promise<Post> => {
  const { author: authorPublicKey, timestamp, content } = postAccount;
  const author = await getProfile(workspace, authorPublicKey);
  return new Post(publicKey, author!, timestamp, content);
};

export const fetchPosts = async (
  workspace: Workspace,
  filters: GetProgramAccountsFilter[] = [],
): Promise<Post[]> => {
  const { program } = workspace;
  const posts = await program.account.post.all(filters);
  return Promise.all(
    posts.map((post) => buildPost(workspace, post.publicKey, post.account)),
  );
};

export const getPost = async (
  workspace: Workspace,
  publicKey: PublicKey,
): Promise<Post> => {
  const { program } = workspace;
  const postAccount = await program.account.post.fetch(publicKey);
  return buildPost(workspace, publicKey, postAccount);
};

export const authorFilter = (
  authorPublicKey: PublicKey,
): GetProgramAccountsFilter => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorPublicKey.toBase58(),
  },
});

export const sendPost = async (
  workspace: Workspace,
  content: string,
): Promise<Post> => {
  const { wallet, program } = workspace;

  const post = anchor.web3.Keypair.generate();

  await program.methods
    .sendPost(content)
    .accounts({
      author: wallet.publicKey,
      post: post.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([post])
    .rpc();

  const postAccount = await program.account.post.fetch(post.publicKey);
  return buildPost(workspace, post.publicKey, postAccount);
};
