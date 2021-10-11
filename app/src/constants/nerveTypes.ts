import type { Amount } from './utils';

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

export const OPTIONS = {
    BLOCKCHAIN: "blockchain",
    COIN: "coin",
    WALLET: "wallet",
}

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
    "Solana": OPTIONS.BLOCKCHAIN,
    "Sol": OPTIONS.COIN,
    "USDT": OPTIONS.COIN,
    "USDC": OPTIONS.COIN,
    "PAI": OPTIONS.COIN,
    "UST": OPTIONS.COIN,
    "Tulip": OPTIONS.COIN,
    "RAY": OPTIONS.COIN,
    "Phantom": OPTIONS.WALLET,
    "Sollet": OPTIONS.WALLET,
    "Solong": OPTIONS.WALLET,
    "Solflare": OPTIONS.WALLET
}


export interface PaymentModel {
  blockchain: string,
  wallet: string,
  coin: string,
  toAccount?: string,
  fromAccount?: string,
  amount?: Amount
}

export interface CoinModel {
  blockchain: string,
  icon: string,
  name: string,
  ticker: string,
  pythAccount: string,
}
