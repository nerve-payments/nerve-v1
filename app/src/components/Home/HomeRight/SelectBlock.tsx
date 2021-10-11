import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {handleBlockClick} from "../../../constants/utils";
import {BLOCK_TO_TYPE, OPTIONS} from "../../../constants/nerveTypes";
import {MouseEvent, useCallback} from "react";
import {WalletName} from "@solana/wallet-adapter-wallets";
import {useWallet} from "@solana/wallet-adapter-react";
import {Tooltip} from "antd";

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
        <div>

            {
                BLOCK_TO_TYPE[props.name] === OPTIONS.COIN
                ?
                    <Tooltip placement="bottomLeft" title={`Required: ${paymentOptions.amount} \nBalance: ${paymentOptions.amount}`}>
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
                            </div>
                        </div>
                    </Tooltip>
                :
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
                        </div>
                    </div>
            }
        </div>

    );
}
