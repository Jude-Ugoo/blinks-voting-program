import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Blinksvotingprog} from '../target/types/blinksvotingprog'

describe('blinksvotingprog', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Blinksvotingprog as Program<Blinksvotingprog>

  const blinksvotingprogKeypair = Keypair.generate()

  it('Initialize Blinksvotingprog', async () => {
    await program.methods
      .initialize()
      .accounts({
        blinksvotingprog: blinksvotingprogKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([blinksvotingprogKeypair])
      .rpc()

    const currentCount = await program.account.blinksvotingprog.fetch(blinksvotingprogKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Blinksvotingprog', async () => {
    await program.methods.increment().accounts({ blinksvotingprog: blinksvotingprogKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinksvotingprog.fetch(blinksvotingprogKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Blinksvotingprog Again', async () => {
    await program.methods.increment().accounts({ blinksvotingprog: blinksvotingprogKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinksvotingprog.fetch(blinksvotingprogKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Blinksvotingprog', async () => {
    await program.methods.decrement().accounts({ blinksvotingprog: blinksvotingprogKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinksvotingprog.fetch(blinksvotingprogKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set blinksvotingprog value', async () => {
    await program.methods.set(42).accounts({ blinksvotingprog: blinksvotingprogKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinksvotingprog.fetch(blinksvotingprogKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the blinksvotingprog account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        blinksvotingprog: blinksvotingprogKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.blinksvotingprog.fetchNullable(blinksvotingprogKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
