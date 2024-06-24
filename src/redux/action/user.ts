/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/user";


export const getUserInfo = createAsyncThunk(
  'user/get-user',
  async () => {
    try {
      const userInfoResponse = await userService.getUserInfo()
      
      return userInfoResponse;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
)

export const userAction = {
  getUserInfo
}