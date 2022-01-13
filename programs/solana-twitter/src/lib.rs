use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("DeWSVxoMAW52Lz49cqSLo21FujaLAeUpJnwxrsBFUFT2");

#[program]
pub mod solana_twitter {
    use super::*;

    pub fn create_profile(ctx: Context<CreateProfile>, _bump: u8, name: String) -> ProgramResult {
        if name.chars().count() > 50 {
            return Err(ErrorCode::NameTooLong.into())
        }

        let profile: &mut Account<Profile> = &mut ctx.accounts.profile;
        let owner: &Signer = &ctx.accounts.owner;

        profile.owner = *owner.key;
        profile.name = name;

        Ok(())
    }

    pub fn send_tweet(ctx: Context<SendTweet>, content: String) -> ProgramResult {
        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into())
        }

        let tweet: &mut Account<Tweet> = &mut ctx.accounts.tweet;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        tweet.author = *author.key;
        tweet.timestamp = clock.unix_timestamp;
        tweet.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct CreateProfile<'info> {
    #[account(
        init, payer = owner, space = Profile::LEN,
        seeds = [owner.key().as_ref(), b"profile".as_ref()], bump = bump
    )]
    pub profile: Account<'info, Profile>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer = author, space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[account]
pub struct Profile {
    pub owner: Pubkey,
    pub name: String,
}

#[account]
pub struct Tweet {
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

impl Profile {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Owner.
        + STRING_LENGTH_PREFIX + MAX_NAME_LENGTH; // Name.
}

impl Tweet {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}

#[error]
pub enum ErrorCode {
    #[msg("The provided name should be 50 characters long maximum.")]
    NameTooLong,
    #[msg("The provided content should be 280 characters long maximum.")]
    ContentTooLong,
}
