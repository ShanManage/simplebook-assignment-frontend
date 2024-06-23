import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from './slice/auth'

const rootReducer = combineReducers({
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;