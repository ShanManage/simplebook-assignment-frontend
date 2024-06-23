/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateNewUserPayloadDto,
} from "../../interfaces";
import { authService } from "../../services/auth";

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (payload: CreateNewUserPayloadDto) => {
    try {
      const createdUserResponse = await authService.createUser(payload)
      return createdUserResponse;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
)

export const authAction = {
  createUser
}