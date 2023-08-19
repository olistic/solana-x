use anchor_lang::prelude::*;

declare_id!("7mcU1c3NdmYjbUG9ZSzwY29VV1gCj4bCDRzB7Jc9KtUS");

#[program]
pub mod solana_x {
    use super::*;

    pub fn create_profile(ctx: Context<CreateProfile>, name: String) -> Result<()> {
        require!(name.chars().count() <= 50, ErrorCode::NameTooLong);

        let profile: &mut Account<Profile> = &mut ctx.accounts.profile;
        let owner: &Signer = &ctx.accounts.owner;

        profile.owner = *owner.key;
        profile.name = name;
        profile.bump = *ctx.bumps.get("profile").unwrap();

        Ok(())
    }

    pub fn send_post(ctx: Context<SendPost>, content: String) -> Result<()> {
        require!(content.chars().count() <= 280, ErrorCode::ContentTooLong);

        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        post.author = *author.key;
        post.timestamp = clock.unix_timestamp;
        post.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateProfile<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = Profile::LEN,
        seeds = [b"profile", owner.key().as_ref()],
        bump,
    )]
    pub profile: Account<'info, Profile>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SendPost<'info> {
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(
        init,
        payer = author,
        space = Post::LEN
    )]
    pub post: Account<'info, Post>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Profile {
    pub owner: Pubkey,
    pub name: String,
    pub bump: u8,
}

#[account]
pub struct Post {
    pub author: Pubkey,
    pub timestamp: i64,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4;
const MAX_NAME_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * 4; // 280 chars max.
const BUMP_LENGTH: usize = 1;

impl Profile {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Owner.
        + STRING_LENGTH_PREFIX + MAX_NAME_LENGTH // Name.
        + BUMP_LENGTH; // Bump.
}

impl Post {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided name should be 50 characters long maximum")]
    NameTooLong,
    #[msg("The provided content should be 280 characters long maximum")]
    ContentTooLong,
}
