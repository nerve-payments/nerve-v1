import {configureStore} from "@reduxjs/toolkit";
import paymentReducer from "./reducers/paymentReducer";

const store = configureStore({
    reducer: {
        payment: paymentReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat()
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
