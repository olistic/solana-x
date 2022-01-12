use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("9Je1KH27W4ARK8F5RSk5ZuDfgwEPgarggzwHdSrgFmBC");

#[program]
pub mod tutorial {
    use super::*;

    pub fn create_profile(ctx: Context<CreateProfile>, name: String) -> ProgramResult {
        // TODO: Enforce only one profile per public key.

        if name.chars().count() > 50 {
            return Err(ErrorCode::NameTooLong.into())
        }

        let profile: &mut Account<Profile> = &mut ctx.accounts.profile;
        let owner: &Signer = &ctx.accounts.owner;

        profile.owner = *owner.key;
        profile.name = name;

        Ok(())
    }

    pub fn post_message(ctx: Context<PostMessage>, content: String) -> ProgramResult {
        if content.chars().count() > 280 {
            return Err(ErrorCode::ContentTooLong.into())
        }

        let message: &mut Account<Message> = &mut ctx.accounts.message;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        message.author = *author.key;
        message.timestamp = clock.unix_timestamp;
        message.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateProfile<'info> {
    #[account(init, payer = owner, space = Profile::LEN)]
    pub profile: Account<'info, Profile>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct PostMessage<'info> {
    #[account(init, payer = author, space = Message::LEN)]
    pub message: Account<'info, Message>,
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
pub struct Message {
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

impl Message {
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
