use anchor_lang::prelude::*;

declare_id!("9Je1KH27W4ARK8F5RSk5ZuDfgwEPgarggzwHdSrgFmBC");

#[program]
pub mod tutorial {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }

    pub fn post_message(ctx: Context<PostMessage>, content: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;

        let message = Message {
            author_address: *user.to_account_info().key,
            content: content.to_string(),
        };

        base_account.message_list.push(message);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 10000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct PostMessage<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Message {
    pub author_address: Pubkey,
    pub content: String,
}

#[account]
pub struct BaseAccount {
    pub message_list: Vec<Message>,
}
