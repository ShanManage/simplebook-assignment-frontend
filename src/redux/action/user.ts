/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/user";
import { EditUserInfoPayloadDto } from "../../interfaces";
import { createAlert } from "../slice/alert";

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

export const editProfile = createAsyncThunk(
  'user/edit-user',
  async (payload: EditUserInfoPayloadDto, { dispatch }) => {
    try {
      const editedUserInfoResponse = await userService.editProfile(payload)
      
      dispatch(createAlert({
        message: 'Profile Updated successfully',
        type: 'success',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      }));

      dispatch(getUserInfo())
      
      return editedUserInfoResponse;
    } catch (error: any) {
      dispatch(createAlert({
        message: error.message,
        type: 'error',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      }));
      throw new Error(error.message);
    }
  }
)
export const userAction = {
  getUserInfo,
  editProfile
}