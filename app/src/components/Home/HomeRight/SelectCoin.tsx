import { getPythProgramKeyForCluster, PythConnection } from "@pythnetwork/client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {SelectOptions} from "./SelectOptions";
export const SelectCoin = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const pythConnection = new PythConnection(connection, getPythProgramKeyForCluster("devnet"))
    // pythConnection.onPriceChange((product, price) => {
    // // sample output:
    // // SRM/USD: $8.68725 ±$0.0131
    // // if(product.asset_type === "")
    // console.log(`${product.symbol}: $${price.price} \xB1$${price.confidence}`)
    // })

    // Start listening for price change events.
    // pythConnection.start()
    const blocks = ["Sol", "USDT", "USDC", "UST", "Tulip", "RAY"];
    return wallet.connected? <SelectOptions heading={"Select Coin"} blocks={blocks} /> : null;
}
