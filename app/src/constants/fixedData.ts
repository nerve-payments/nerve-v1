import solanaLogo from "../assets/coins/solana.png";
import usdtLogo from "../assets/coins/usdt.png";
import usdcLogo from "../assets/coins/usdc.png";
import paiLogo from "../assets/coins/pai.png";
import ustLogo from "../assets/coins/ust.png";
import tulipLogo from "../assets/coins/tulip.png";
import rayLogo from "../assets/coins/ray.png";
import phantomLogo from "../assets/wallets/phantom.png";
import solletLogo from "../assets/wallets/sollet.png";
import solongLogo from "../assets/wallets/solong.png";
import solflareLogo from "../assets/wallets/solflare.svg";

export const BLOCKCHAIN = "blockchain";
export const COIN = "coin";
export const WALLET = "wallet";

export const BLOCK_TO_LOGO: any = {
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

export const BLOCK_TO_TYPE: any = {
    "Solana": BLOCKCHAIN,
    "Sol": COIN,
    "USDT": COIN,
    "USDC": COIN,
    "PAI": COIN,
    "UST": COIN,
    "Tulip": COIN,
    "RAY": COIN,
    "Phantom": WALLET,
    "Sollet": WALLET,
    "Solong": WALLET,
    "Solflare": WALLET
}
