import {CategoryHeader} from "./CategoryHeader";
import {SelectBlock} from "./SelectBlock";
import solanaLogo from "../../../assets/coins/solana.png";
import usdtLogo from "../../../assets/coins/usdt.png";
import usdcLogo from "../../../assets/coins/usdc.png";
import paiLogo from "../../../assets/coins/pai.png";
import ustLogo from "../../../assets/coins/ust.png";
import tulipLogo from "../../../assets/coins/tulip.png";
import rayLogo from "../../../assets/coins/ray.png";
import phantomLogo from "../../../assets/wallets/phantom.png";
import solletLogo from "../../../assets/wallets/sollet.png";
import solongLogo from "../../../assets/wallets/solong.png";
import solflareLogo from "../../../assets/wallets/solflare.svg";
import {Col, Row} from "antd";

export const SelectOptions = (props: { heading : String, blocks: Array<string> }) => {
    const blockToLogoMap: any = {
        "Solana": solanaLogo,
        "Sol": solanaLogo,
        "USDT": usdtLogo,
        "USDC": usdcLogo,
        "PAI": paiLogo,
        "UST": ustLogo,
        "Tulip": tulipLogo,
        "RAY": rayLogo,
        "Phantom": phantomLogo,
        "Sollet": solletLogo,
        "Solong": solongLogo,
        "Solflare": solflareLogo
    }
    return (
        <div>
            <CategoryHeader heading={props.heading} />
            <Row>
                {
                    props.blocks.map(item => {
                        return <Col sm={8} md={4}><SelectBlock name={item} logo={blockToLogoMap[item]} /></Col>;
                    })
                }
            </Row>
        </div>
    )
}
