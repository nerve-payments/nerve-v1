import {SelectBlockchain} from "./HomeRight/SelectBlockchain";
import {SelectCoin} from "./HomeRight/SelectCoin";
import {SelectWallet} from "./HomeRight/SelectWallet";
import {Button, Divider} from "antd";

export const HomeRight = () => {
    return (
        <div>
            <SelectBlockchain />
            <SelectCoin />
            <SelectWallet />
            <Divider />
            <div>
                <Button className={"gradient-button"}>Pay</Button>
            </div>
        </div>
    )
}
