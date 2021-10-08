import {SelectBlockchain} from "./HomeRight/SelectBlockchain";
import {SelectWallet} from "./HomeRight/SelectWallet";

export const HomeRight = () => {
    return (
        <div>
            <SelectBlockchain />
            <SelectWallet />
        </div>
    )
}
