#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod blinksvotingprog {
    use super::*;

  pub fn close(_ctx: Context<CloseBlinksvotingprog>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.blinksvotingprog.count = ctx.accounts.blinksvotingprog.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.blinksvotingprog.count = ctx.accounts.blinksvotingprog.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeBlinksvotingprog>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.blinksvotingprog.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeBlinksvotingprog<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Blinksvotingprog::INIT_SPACE,
  payer = payer
  )]
  pub blinksvotingprog: Account<'info, Blinksvotingprog>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseBlinksvotingprog<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub blinksvotingprog: Account<'info, Blinksvotingprog>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub blinksvotingprog: Account<'info, Blinksvotingprog>,
}

#[account]
#[derive(InitSpace)]
pub struct Blinksvotingprog {
  count: u8,
}