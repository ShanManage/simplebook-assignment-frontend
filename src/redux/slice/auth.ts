import { createSlice } from "@reduxjs/toolkit";
import {
  AuthState,
} from "../../interfaces";
import { createUser } from "../action";

const initialState: AuthState = {
  isLoading: false,
  isAuthorized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.isAuthorized = false
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true
        state.isAuthorized = false
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false
        state.isAuthorized = true
      })
      .addCase(createUser.rejected, (state) => {
        state.isLoading = false
        state.isAuthorized = false
      })
  },
})

export const {
  clearAuthState
} = authSlice.actions

export default authSlice.reducer;