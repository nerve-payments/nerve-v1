import {SelectOptions} from "./SelectOptions";
import {useState} from "react";

export const SelectCoin = () => {
    const blocks = ["Sol", "USDT", "USDC", "UST", "Tulip", "RAY"];
    const [selectedBlock, setSelectedBlock] = useState("");
    return (
        <SelectOptions heading={"Select Coin"} blocks={blocks} />
    )
}
