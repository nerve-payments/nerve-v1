import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import BN from "bn.js";
import { pay } from "../models/pay"

export const payMerchant = async (wallet: WalletContextState, connection: Connection) => {
    let [ok, txid] = await pay(wallet, connection, new BN(1000));
    console.log(txid);
    if(ok) {

    } else {

    }
}
