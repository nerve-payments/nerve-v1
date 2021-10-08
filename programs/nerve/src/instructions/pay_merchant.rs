use anchor_lang::prelude::*;
use anchor_lang::Key;
use anchor_spl::token::{self, Transfer};

use crate::Amount;

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct PayMerchant<'info> {

    /// The user that is paying the merchant
    #[account(signer)]
    pub payer_account: AccountInfo<'info>,

    /// The token account with the tokens to be deposited
    #[account(mut)]
    pub deposit_source: AccountInfo<'info>,

    /// The merchant account to receive the tokens to
    #[account(mut)]
    pub merchant_account: AccountInfo<'info>,

    #[account(address = token::ID)]
    pub token_program: AccountInfo<'info>,
}

impl<'info> PayMerchant<'info> {
    fn transfer_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        CpiContext::new(
            self.token_program.clone(),
            Transfer {
                from: self.deposit_source.to_account_info(),
                to: self.merchant_account.to_account_info(),
                authority: self.payer_account.clone(),
            },
        )
    }
}

/// Pay merchant
pub fn handler(ctx: Context<PayMerchant>, amount: Amount) -> ProgramResult {
    // Get the amount being transferred
    let token_amount = amount.value;

    // Now that we have the note value, we can transfer this deposit
    // to the vault and mint the new notes
    token::transfer(ctx.accounts.transfer_context(), token_amount)?;

    Ok(())
}
