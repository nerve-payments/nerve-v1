import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button, message } from "antd"
import { useState } from "react";
import { payMerchant } from "../../txns/payMerchant"

export const PayButton = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [loading, setLoading] = useState(false);
    const pay = async () => {
        setLoading(true);
        await payMerchant(wallet, connection);
        message.success("Payment succesfull, redirecting...")
    }
    return(
        <div>
            <Button loading={loading} disabled={loading} onClick={() => pay()} className={"gradient-button"}>Pay</Button>
        </div>
    )
}