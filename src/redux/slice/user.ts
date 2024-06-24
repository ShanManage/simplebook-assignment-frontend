import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../interfaces";
import { editProfile, editProfileImage, getUserInfo } from "../action";

const initialState: UserState = {
  isLoading: false,
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
  reducers: {},
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
    .addCase(editProfileImage.pending, (state) => {
      state.isLoading = true
    })
    .addCase(editProfileImage.fulfilled, (state) => {
      state.isLoading = false
    })
    .addCase(editProfileImage.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default userSlice.reducer;