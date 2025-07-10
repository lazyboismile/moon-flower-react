import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer  from "./screens/homePage/slice";
import ProductPageReducer from "./screens/productsPage/slice";
import reduxLogger from "redux-logger";
import OrdersPageReducer from "./screens/ordersPage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductPageReducer,
    ordersPage: OrdersPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
