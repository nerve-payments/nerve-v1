import {SelectOptions} from "./SelectOptions";
import React, { FC, useMemo } from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolletExtensionWallet,
    getSolletWallet,
    getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { SelectCoin } from "./SelectCoin";
import { Divider } from "antd";
import { useAppSelector } from "../../../store/hooks";
import { Payment } from "./Payment";

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const SelectWallet: FC = () => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const walletOptions = useMemo(() => [
        getPhantomWallet(),
        getSlopeWallet(),
        getSolflareWallet(),
        getTorusWallet({
            options: { clientId: 'Get a client ID @ https://developer.tor.us' }
        }),
        getLedgerWallet(),
        getSolletWallet({ network }),
        getSolletExtensionWallet({ network }),
    ], [network]);

    const blocks = ["Phantom", "Sollet", "Solong", "Solflare"];
    const paymentOptions = useAppSelector(state => state.payment);
    if(!paymentOptions.blockchain) {
        return null;
    }
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={walletOptions} autoConnect>
                <WalletModalProvider>
                    <SelectOptions heading={"Select Wallet"} blocks={blocks} />
                    <SelectCoin />
                    <Divider />
                    <Payment />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
};
