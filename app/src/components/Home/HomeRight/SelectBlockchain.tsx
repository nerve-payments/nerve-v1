import {SelectOptions} from "./SelectOptions";

export const SelectBlockchain = () => {
    const blocks = ["Solana"];
    return (
        <SelectOptions heading={"Select Blockchain"} blocks={blocks} />
    )
}
