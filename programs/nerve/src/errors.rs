use anchor_lang::error;

#[error]
pub enum ErrorCode {
    #[msg("failed to perform some math operation safely")]
    ArithmeticError,

    #[msg("oracle account provided is not valid")]
    InvalidOracle,
}
