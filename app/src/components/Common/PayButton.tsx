import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "antd"
import { payMerchant } from "../../txns/payMerchant"

export const PayButton = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    return(
        <div>
        <Button onClick={() => payMerchant(wallet, connection)} className={"gradient-button"}>Pay</Button>
    </div>
    )
}