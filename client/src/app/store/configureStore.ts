import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../feature/account/accountSlice";
import { basketSlice } from "../../feature/Basket/basketSlice";
import { catalogSlice } from "../../feature/catalog/catalogSlice";
import { counterSlice } from "../../feature/contact/counterSlice";
import { ordersSlise } from "../../feature/orders/ordersSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer,
        orders: ordersSlise.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;