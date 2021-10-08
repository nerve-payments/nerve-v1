import {SelectOptions} from "./SelectOptions";
import {useState} from "react";

export const SelectBlockchain = () => {
    const blocks = ["Solana"];
    const [selectedBlock, setSelectedBlock] = useState("");
    return (
        <SelectOptions heading={"Select Blockchain"} blocks={blocks} />
    )
}
