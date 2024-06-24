import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  alertReducer,
  authReducer,
  productReducer,
  userReducer
} from './slice'

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  product: productReducer,
  user: userReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;