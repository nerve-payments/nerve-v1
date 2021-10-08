import {SelectOptions} from "./SelectOptions";

export const SelectCoin = () => {
    const blocks = ["Sol", "USDT", "USDC", "UST", "Tulip", "RAY"];
    return (
        <SelectOptions heading={"Select Coin"} blocks={blocks} />
    )
}
