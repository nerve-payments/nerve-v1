import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {handleBlockClick} from "../../../constants/utils";
import {BLOCK_TO_TYPE, OPTIONS} from "../../../constants/nerveTypes";
import {MouseEvent, useCallback} from "react";
import {WalletName} from "@solana/wallet-adapter-wallets";
import {useWallet} from "@solana/wallet-adapter-react";

export const SelectBlock = (props: { logo: string, name: string }) => {
    const dispatch = useAppDispatch();
    const paymentOptions = useAppSelector(state => state.payment);
    const { select } = useWallet();
    const handleWalletClick = useCallback(
        (event: MouseEvent, walletName: WalletName) => {
            select(walletName);
            handleBlockClick(dispatch, props.name);
        },
        [select, dispatch, props.name]
    );
    return (
        <div style={{height: 120}} onClick={(e) => (
            BLOCK_TO_TYPE[props.name] === OPTIONS.WALLET
            ?
            handleWalletClick(e, props.name as WalletName)
            :
            handleBlockClick(dispatch, props.name)
        )}>
            <div className={"select-block"+(paymentOptions[BLOCK_TO_TYPE[props.name]] === props.name ? " selected-block": "")}>
                <img src={props.logo} alt={props.logo} height={40} width={40} />
                <p style={{marginTop: 30, fontWeight: 600}}>{props.name}</p>
                {BLOCK_TO_TYPE[props.name] === OPTIONS.COIN &&
                    <>
                        <p style={{marginTop: 10, fontWeight: 200}}>Balance - 200 {props.name}</p>
                        <p style={{marginTop: 10, fontWeight: 200}}>Required - 200 {props.name}</p>
                    </>
                }
            </div>
        </div>
    );
}
