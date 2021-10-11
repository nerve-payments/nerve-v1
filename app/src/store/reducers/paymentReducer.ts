import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export const initialState = {
    amount: 653,
    merchant: "Shashwat Football"
} as any;

const paymentReducer = createSlice({
    name: "payment",
    initialState,
    reducers: {
        selectBlockchain: (state, action: PayloadAction<string>) => {
            state.blockchain = state.blockchain === action.payload ? "" : action.payload
        },
        selectWallet: (state, action: PayloadAction<string>) => {
            state.wallet = state.wallet === action.payload ? "" : action.payload
        },
        selectCoin: (state, action: PayloadAction<string>) => {
            state.coin = state.coin === action.payload ? "" : action.payload
        }
    }
})

export const {selectBlockchain, selectCoin, selectWallet} = paymentReducer.actions;
export default paymentReducer.reducer;
