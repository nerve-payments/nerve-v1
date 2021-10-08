use anchor_lang::prelude::*;


pub mod errors;
mod instructions;
pub mod state;
pub mod utils;

use instructions::*;
use errors::ErrorCode;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nerve {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }

    pub fn pay_merchant(ctx: Context<PayMerchant>, amount: Amount) -> ProgramResult {
        instructions::pay_merchant::handler(ctx, amount)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
/// Specifies the units of some amount of value
#[derive(AnchorDeserialize, AnchorSerialize, Eq, PartialEq, Debug, Clone, Copy)]
pub enum AmountUnits {
    Tokens,
}

/// Represent an amount of some value (like tokens, or notes)
#[derive(AnchorDeserialize, AnchorSerialize, Eq, PartialEq, Debug, Clone, Copy)]
pub struct Amount {
    pub units: AmountUnits,
    pub value: u64,
}

impl Amount {
    /// Get the amount represented in tokens
    pub fn from_tokens(value: u64) -> Amount {
        Amount {
            units: AmountUnits::Tokens,
            value,
        }
    }
}
