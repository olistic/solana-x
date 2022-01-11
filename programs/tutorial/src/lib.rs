use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("9Je1KH27W4ARK8F5RSk5ZuDfgwEPgarggzwHdSrgFmBC");

#[program]
pub mod tutorial {
    use super::*;

    pub fn post_message(ctx: Context<PostMessage>, content: String) -> ProgramResult {
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
pub struct PostMessage<'info> {
    #[account(init, payer = author, space = Message::LEN)]
    pub message: Account<'info, Message>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
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
const MAX_CONTENT_LENGTH: usize = 280 * 4; // 280 chars max.

impl Message {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}
