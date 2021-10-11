import { Connection, Keypair, PublicKey, Signer, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as anchor from '@project-serum/anchor';
import { sendTransaction, transactionErrorToString } from './programUtil';
import { Amount } from '../constants/utils';
import { WalletContextState } from '@solana/wallet-adapter-react';

let program: anchor.Program | null;
let depositSourceKeypair: Keypair | undefined;
// Deposit
export const pay = async (wallet: WalletContextState, connection: Connection, lamports: BN)
  : Promise<[ok: boolean, txid: string | undefined]> => {
    anchor.setProvider(new anchor.Provider(
        connection,
        wallet as unknown as anchor.Wallet,
        anchor.Provider.defaultOptions()
      ));
    const resp = await fetch('idl/nerve.json');
    let idl = await resp.json();
    program = new anchor.Program(idl, (new anchor.web3.PublicKey(idl.metadata.address)));
    let payerAccount = wallet.publicKey;
    let depositSource = new PublicKey("EanfM1a9wtbVEpwg4jFgTeMBUSrrfLM1MixRH4bvoHgy");
    let merchantAccount = new PublicKey("4xeQdtMjHE1MtynEXs6tfGUUL9sCS6WQGc5sUtrTueoA");
    const amount = Amount.tokens(lamports);
    const payMerchantIx = program.instruction.payMerchant(amount, {
        accounts: {
            payerAccount: payerAccount,
            depositSource: depositSource,
            merchantAccount: merchantAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
        }
    });


  const ix = [
    payMerchantIx,
  ].filter(ix => ix) as TransactionInstruction[];
  const signers = [] as Keypair[];

  try {
    return await sendTransaction(program.provider, ix, signers);
  } catch (err) {
    console.error(`Deposit error: ${transactionErrorToString(err)}`);
    return [false, undefined];
  }
};
