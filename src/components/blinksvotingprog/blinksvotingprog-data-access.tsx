'use client'

import { getBlinksvotingprogProgram, getBlinksvotingprogProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useBlinksvotingprogProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getBlinksvotingprogProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getBlinksvotingprogProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['blinksvotingprog', 'all', { cluster }],
    queryFn: () => program.account.blinksvotingprog.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['blinksvotingprog', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ blinksvotingprog: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useBlinksvotingprogProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useBlinksvotingprogProgram()

  const accountQuery = useQuery({
    queryKey: ['blinksvotingprog', 'fetch', { cluster, account }],
    queryFn: () => program.account.blinksvotingprog.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['blinksvotingprog', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ blinksvotingprog: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['blinksvotingprog', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ blinksvotingprog: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['blinksvotingprog', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ blinksvotingprog: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['blinksvotingprog', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ blinksvotingprog: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
