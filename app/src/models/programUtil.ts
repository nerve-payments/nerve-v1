import { BN } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import { MintInfo, MintLayout, AccountInfo as TokenAccountInfo, AccountLayout as TokenAccountLayout } from "@solana/spl-token";
import { AccountInfo, Commitment, Connection, Context, PublicKey, Signer, Transaction, TransactionInstruction } from "@solana/web3.js";
import { Buffer } from "buffer";
import { TokenAmount } from "../constants/utils";
import { inDevelopment } from "./nerve";

// Find PDA functions and jet algorithms that are reimplemented here

export const SOL_DECIMALS = 9;
export const NULL_PUBKEY = new PublicKey("11111111111111111111111111111111");

/**
 * Fetch an account for the specified public key and subscribe a callback
 * to be invoked whenever the specified account changes.
 *
 * @param connection Connection to use
 * @param publicKey Public key of the account to monitor
 * @param callback Function to invoke whenever the account is changed
 * @param commitment Specify the commitment level account changes must reach before notification
 * @return subscription id
 */
export const getTokenAccountAndSubscribe = async function (
  connection: Connection,
  publicKey: anchor.web3.PublicKey,
  decimals: number,
  callback: (amount: TokenAmount | undefined, context: Context) => void,
  commitment?: Commitment
): Promise<number> {
  return await getAccountInfoAndSubscribe(connection, publicKey, (account, context) => {
    if (account != null) {
      if(account.data.length !== 165){
        console.log('account data length', account.data.length);
      }
      const decoded = parseTokenAccount(account, publicKey);
      const amount = TokenAmount.tokenAccount(decoded.data, decimals);
      callback(amount, context);
    } else {
      callback(undefined, context);
    }
  }, commitment);
};

/**
 * Fetch an account for the specified public key and subscribe a callback
 * to be invoked whenever the specified account changes.
 *
 * @param connection Connection to use
 * @param publicKey Public key of the account to monitor
 * @param callback Function to invoke whenever the account is changed
 * @param commitment Specify the commitment level account changes must reach before notification
 * @return subscription id
 */
export const getMintInfoAndSubscribe = async function (
  connection: Connection,
  publicKey: anchor.web3.PublicKey,
  callback: (amount: TokenAmount | undefined, context: Context) => void,
  commitment?: Commitment | undefined
): Promise<number> {
  return await getAccountInfoAndSubscribe(connection, publicKey, (account, context) => {
    if (account != null) {
      let mintInfo = MintLayout.decode(account.data) as MintInfo;
      let amount = TokenAmount.mint(mintInfo);
      callback(amount, context);
    } else {
      callback(undefined, context);
    }
  }, commitment);
};

/**
 * Fetch an account for the specified public key and subscribe a callback
 * to be invoked whenever the specified account changes.
 *
 * @param connection Connection to use
 * @param publicKey Public key of the account to monitor
 * @param callback Function to invoke whenever the account is changed
 * @param commitment Specify the commitment level account changes must reach before notification
 * @return subscription id
 */
export const getProgramAccountInfoAndSubscribe = async function <T>(
  connection: anchor.web3.Connection,
  publicKey: anchor.web3.PublicKey,
  coder: anchor.Coder,
  accountType: string,
  callback: (acc: AccountInfo<T> | undefined, context: Context) => void,
  commitment?: Commitment | undefined
): Promise<number> {
  return await getAccountInfoAndSubscribe(connection, publicKey, (account, context) => {
    if (account != null) {
      const decoded: AccountInfo<T> = {
        ...account,
        data: coder.accounts.decode(accountType, account.data) as T,
      };
      callback(decoded, context);
    } else {
      callback(undefined, context);
    }
  }, commitment);
};

/**
 * Fetch an account for the specified public key and subscribe a callback
 * to be invoked whenever the specified account changes.
 *
 * @param connection Connection to use
 * @param publicKey Public key of the account to monitor
 * @param callback Function to invoke whenever the account is changed
 * @param commitment Specify the commitment level account changes must reach before notification
 * @return subscription id
 */
export const getAccountInfoAndSubscribe = async function (
  connection: anchor.web3.Connection,
  publicKey: anchor.web3.PublicKey,
  callback: (acc: AccountInfo<Buffer> | null, context: Context) => void,
  commitment?: Commitment | undefined
): Promise<number> {
  let latestSlot: number = -1;
  let subscriptionId = connection.onAccountChange(
    publicKey,
    (account: AccountInfo<Buffer>, context: Context) => {
      if (context.slot >= latestSlot) {
        latestSlot = context.slot;
        callback(account, context);
      }
    },
    commitment
  );

  const response = await connection.getAccountInfoAndContext(publicKey, commitment);
  if (response.context.slot >= latestSlot) {
    latestSlot = response.context.slot;
    if (response.value != null) {
      callback(response.value, response.context);
    } else {
      callback(null, response.context);
    }
  }

  return subscriptionId;
};

export const sendTransaction = async (
  provider: anchor.Provider,
  instructions: TransactionInstruction[],
  signers?: Signer[],
  skipConfirmation?: boolean
): Promise<[ok: boolean, txid: string | undefined]> => {
  if (!provider.wallet?.publicKey) {
    throw new Error("Wallet is not connected");
  }

  // Building phase
  let transaction = new Transaction();
  transaction.instructions = instructions;
  transaction.recentBlockhash = (
    await provider.connection.getRecentBlockhash()
  ).blockhash;
  transaction.feePayer = provider.wallet.publicKey;

  // Signing phase
  if (signers && signers.length > 0) {
    transaction.partialSign(...signers)
  }
  try {
    transaction = await provider.wallet.signTransaction(transaction);
  }
  catch (ex) {
    // wallet refused to sign
    return [false, 'cancelled'];
  }

  // Sending phase
  console.log(`Transaction`, transaction);
  const rawTransaction = transaction.serialize();
  const txid = await provider.connection.sendRawTransaction(
    rawTransaction,
    provider.opts
    );
  console.log(`Transaction ${explorerUrl(txid)} ${rawTransaction.byteLength} of 1232 bytes...`, transaction);

  // Confirming phase
  let ok = true;
  if (!skipConfirmation) {
    const status = (
      await provider.connection.confirmTransaction(
        txid,
        provider.opts.commitment
      )
    ).value;

    if (status?.err) {
      ok = false;
    }
  }

  return [ok, txid];
};

export interface InstructionAndSigner { ix: TransactionInstruction[], signers?: Signer[] };

export const sendAllTransactions = async (
  provider: anchor.Provider,
  transactions: InstructionAndSigner[],
  skipConfirmation?: boolean
): Promise<[ok: boolean, txid: string[]]> => {
  if (!provider.wallet?.publicKey) {
    throw new Error("Wallet is not connected");
  }

  // Building and partial sign phase
  const recentBlockhash = await provider.connection.getRecentBlockhash();
  const txs: Transaction[] = [];
  for (const tx of transactions) {
    if (tx.ix.length === 0) {
      continue;
    }
    let transaction = new Transaction();
    transaction.instructions = tx.ix;
    transaction.recentBlockhash = recentBlockhash.blockhash;
    transaction.feePayer = provider.wallet.publicKey;
    if (tx.signers && tx.signers.length > 0) {
      transaction.partialSign(...tx.signers)
    }
    txs.push(transaction);
  }

  // Signing phase
  let signedTransactions: Transaction[];
  try {
    signedTransactions = await provider.wallet.signAllTransactions(txs);
  }
  catch (ex) {
    // wallet refused to sign
    return [false, ['cancelled']];
  }

  // Sending phase
  console.log("Transactions", txs);
  let ok = true;
  const txids: string[] = [];
  for (const transaction of signedTransactions) {
    const rawTransaction = transaction.serialize();
    const txid = await provider.connection.sendRawTransaction(
      rawTransaction,
      provider.opts
    );
    console.log(`Transaction ${explorerUrl(txid)} ${rawTransaction.byteLength} of 1232 bytes...`);
    txids.push(txid);

    // Confirming phase
    if (!skipConfirmation) {
      const status = (
        await provider.connection.confirmTransaction(
          txid,
          provider.opts.commitment
        )
      ).value;

      if (status?.err) {
        ok = false;
      }
    }
  }
  return [ok, txids];
};

export const explorerUrl = (txid: string) => {
  const clusterParam = inDevelopment ? `?cluster=devnet` : "";
  return `https://explorer.solana.com/transaction/${txid}${clusterParam}`
};

/**
 * Transaction errors contain extra goodies like a message and error code. Log them
 * @param error An error object from anchor.
 * @returns A stringified error.
 */
export const transactionErrorToString = (error: any) => {
  if (error.code) {
    return `Code ${error.code}: ${error.msg}\n${error.logs}\n${error.stack}`
  } else {
    return error;
  }
};

export const parseTokenAccount = (account: AccountInfo<Buffer>, accountPubkey: PublicKey) => {
  const data = TokenAccountLayout.decode(account.data);

  // PublicKeys and BNs are currently Uint8 arrays and
  // booleans are really Uint8s. Convert them
  const decoded: AccountInfo<TokenAccountInfo> = {
    ...account,
    data: {
      address: accountPubkey,
      mint: new PublicKey(data.mint),
      owner: new PublicKey(data.owner),
      amount: new BN(data.amount, undefined, "le"),
      delegate: (data as any).delegateOption ? new PublicKey(data.delegate!) : null,
      delegatedAmount: new BN(data.delegatedAmount, undefined, "le"),
      isInitialized: (data as any).state !== 0,
      isFrozen: (data as any).state === 2,
      isNative: !!(data as any).isNativeOption,
      rentExemptReserve: new BN(0, undefined, "le"), //  Todo: calculate. I believe this is lamports minus rent for wrapped sol
      closeAuthority: (data as any).closeAuthorityOption ? new PublicKey(data.closeAuthority!) : null,
    }
  }
  return decoded;
};

export const parseU192 = (data: Buffer | number[]) => {
  return new BN(data, undefined, "le");
};
