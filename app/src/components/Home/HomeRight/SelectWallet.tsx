import {SelectOptions} from "./SelectOptions";
import {useState} from "react";

export const SelectWallet = () => {
    const blocks = ["Phantom", "Sollet", "Solong", "Solflare"];
    const [selectedBlock, setSelectedBlock] = useState("");
    return (
        <SelectOptions heading={"Select Wallet"} blocks={blocks} />
    )
}
