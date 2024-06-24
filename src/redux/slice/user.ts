import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../interfaces";
import { editProfile, getUserInfo } from "../action";

const initialState: UserState = {
  isLoading: false,
  status: 'initial',
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    id: "",
    image: ""
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserStatus: (state) => {
      state.status = 'initial'
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUserInfo.pending, (state) => {
      state.user = initialState.user
      state.isLoading = true
    })
    .addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload.data
      state.isLoading = false
    })
    .addCase(getUserInfo.rejected, (state) => {
      state.user = initialState.user
      state.isLoading = false
    })
    .addCase(editProfile.pending, (state) => {
      state.isLoading = true
    })
    .addCase(editProfile.fulfilled, (state) => {
      state.isLoading = false
    })
    .addCase(editProfile.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const {
  clearUserStatus
} = userSlice.actions

export default userSlice.reducer;