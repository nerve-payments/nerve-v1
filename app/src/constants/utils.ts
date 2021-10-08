import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {PaymentModel} from "../models/pay";
import {BLOCK_TO_TYPE, BLOCKCHAIN, COIN, WALLET} from "./fixedData";
import {selectBlockchain, selectCoin, selectWallet} from "../store/reducers/paymentReducer";

export const handleBlockClick = (dispatch: ThunkDispatch<{payment: PaymentModel}, null, AnyAction>, data: string) => {
    switch (BLOCK_TO_TYPE[data]){
        case BLOCKCHAIN:
            dispatch(selectBlockchain(data));
            break;
        case COIN:
            dispatch(selectCoin(data));
            break;
        case WALLET:
            dispatch(selectWallet(data));
            break;
        default:
            break;
    }
}
