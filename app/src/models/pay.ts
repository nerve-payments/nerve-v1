export interface PaymentModel {
    blockchain: string,
    wallet: string,
    coin: string,
    toAccount?: string,
    fromAccount?: string,
    amount?: number
}
export {}
// import { BN } from "@project-serum/anchor";
// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

// // Deposit
// export const pay = async (abbrev: string, lamports: BN)
//   : Promise<[ok: boolean, txid: string | undefined]> => {
//   let payerAccount = wallet.pubkey;
//   let depositSource = wallet.pubkey;
//   let merchantAcount = wallet.pubkey;
//   let tokenProgram = TOKEN_PROGRAM_ID;
//   // When handling SOL, ignore existing wsol accounts and initialize a new wrapped sol account
//   if (asset.tokenMintPubkey.equals(NATIVE_MINT)) {
//     // Overwrite the deposit source
//     // The app will always wrap native sol, ignoring any existing wsol
//     depositSourceKeypair = Keypair.generate();
//     depositSourcePubkey = depositSourceKeypair.publicKey;

//     const rent = await connection.getMinimumBalanceForRentExemption(TokenAccountLayout.span);
//     createTokenAccountIx = SystemProgram.createAccount({
//       fromPubkey: wallet.publicKey,
//       newAccountPubkey: depositSourcePubkey,
//       programId: TOKEN_PROGRAM_ID,
//       space: TokenAccountLayout.span,
//       lamports: parseInt(lamports.addn(rent).toString())
//     })

//     initTokenAccountIx = Token.createInitAccountInstruction(
//       TOKEN_PROGRAM_ID,
//       NATIVE_MINT,
//       depositSourcePubkey,
//       wallet.publicKey
//     );

//     closeTokenAccountIx = Token.createCloseAccountInstruction(
//       TOKEN_PROGRAM_ID,
//       depositSourcePubkey,
//       wallet.publicKey,
//       wallet.publicKey,
//       []);
//   }

//   // Create the deposit note dest account if it doesn't exist
//   if (!asset.depositNoteExists) {
//     initDepositAccountIx = program.instruction.initDepositAccount(asset.depositNoteBump, {
//       accounts: {
//         market: market.accountPubkey,
//         marketAuthority: market.authorityPubkey,

//         reserve: reserve.accountPubkey,
//         depositNoteMint: reserve.depositNoteMintPubkey,

//         depositor: wallet.publicKey,
//         depositAccount: asset.depositNotePubkey,

//         tokenProgram: TOKEN_PROGRAM_ID,
//         systemProgram: SystemProgram.programId,
//         rent: anchor.web3.SYSVAR_RENT_PUBKEY,
//       },
//     });
//   }

//   if (!assets.obligation) {
//     initObligationIx = buildInitObligationIx()
//   }

//   // Obligatory refresh instruction
//   const refreshReserveIx = buildRefreshReserveIx(abbrev);
//   const amount = Amount.tokens(lamports);
//   const depositIx = program.instruction.deposit(asset.depositNoteBump, amount, {
//     accounts: {
//       market: market.accountPubkey,
//       marketAuthority: market.authorityPubkey,

//       reserve: reserve.accountPubkey,
//       vault: reserve.vaultPubkey,
//       depositNoteMint: reserve.depositNoteMintPubkey,

//       depositor: wallet.publicKey,
//       depositAccount: asset.depositNotePubkey,
//       depositSource: depositSourcePubkey,

//       tokenProgram: TOKEN_PROGRAM_ID,
//     }
//   });

//   // Initialize the collateral account if it doesn't exist
//   if (!asset.collateralNoteExists) {
//     initCollateralAccountIx = program.instruction.initCollateralAccount(asset.collateralNoteBump, {
//       accounts: {
//         market: market.accountPubkey,
//         marketAuthority: market.authorityPubkey,

//         obligation: assets.obligationPubkey,
//         reserve: reserve.accountPubkey,
//         depositNoteMint: reserve.depositNoteMintPubkey,

//         owner: wallet.publicKey,
//         collateralAccount: asset.collateralNotePubkey,

//         tokenProgram: TOKEN_PROGRAM_ID,
//         systemProgram: SystemProgram.programId,
//         rent: SYSVAR_RENT_PUBKEY,
//       }
//     });
//   }

//   const depositCollateralBumpSeeds = {
//     collateralAccount: asset.collateralNoteBump,
//     depositAccount: asset.depositNoteBump,
//   };
//   let depositCollateralIx = program.instruction.depositCollateral(depositCollateralBumpSeeds, amount, {
//     accounts: {
//       market: market.accountPubkey,
//       marketAuthority: market.authorityPubkey,

//       reserve: reserve.accountPubkey,

//       obligation: assets.obligationPubkey,
//       owner: wallet.publicKey,
//       depositAccount: asset.depositNotePubkey,
//       collateralAccount: asset.collateralNotePubkey,

//       tokenProgram: TOKEN_PROGRAM_ID,
//     }
//   });

//   const ix = [
//     createTokenAccountIx,
//     initTokenAccountIx,
//     initDepositAccountIx,
//     initObligationIx,
//     initCollateralAccountIx,
//     refreshReserveIx,
//     depositIx,
//     depositCollateralIx,
//     closeTokenAccountIx
//   ].filter(ix => ix) as TransactionInstruction[];
//   const signers = [depositSourceKeypair].filter(signer => signer) as Keypair[];

//   try {
//     return await sendTra(program.provider, ix, signers);
//   } catch (err) {
//     console.error(`Deposit error: ${transactionErrorToString(err)}`);
//     rollbar.error(`Deposit error: ${transactionErrorToString(err)}`);
//     return [false, undefined];
//   }
// };
