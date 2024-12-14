// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import BlinksvotingprogIDL from '../target/idl/blinksvotingprog.json'
import type { Blinksvotingprog } from '../target/types/blinksvotingprog'

// Re-export the generated IDL and type
export { Blinksvotingprog, BlinksvotingprogIDL }

// The programId is imported from the program IDL.
export const BLINKSVOTINGPROG_PROGRAM_ID = new PublicKey(BlinksvotingprogIDL.address)

// This is a helper function to get the Blinksvotingprog Anchor program.
export function getBlinksvotingprogProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...BlinksvotingprogIDL, address: address ? address.toBase58() : BlinksvotingprogIDL.address } as Blinksvotingprog, provider)
}

// This is a helper function to get the program ID for the Blinksvotingprog program depending on the cluster.
export function getBlinksvotingprogProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Blinksvotingprog program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return BLINKSVOTINGPROG_PROGRAM_ID
  }
}
