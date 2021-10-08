import {SelectBlockchain} from "./HomeRight/SelectBlockchain";
import {SelectCoin} from "./HomeRight/SelectCoin";
import {SelectWallet} from "./HomeRight/SelectWallet";
import {Button, Divider} from "antd";
import { payMerchant } from "../../txns/payMerchant";

export const HomeRight = () => {
    return (
        <div>
            <SelectBlockchain />
            <SelectWallet />
        </div>
    )
}
