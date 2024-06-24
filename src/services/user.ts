import { AxiosResponse } from "axios";
import {
  EditUserInfoPayloadDto,
  EditUserInfoResponseDto,
  UserDto,
} from "../interfaces";
import { axiosPrivateInstance } from ".";

const getUserInfo = async (): Promise<AxiosResponse<UserDto>> => {
  try {
    const res: AxiosResponse<UserDto> = await axiosPrivateInstance.get('/api/users/');
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

const editProfile = async (
  payload: EditUserInfoPayloadDto,
): Promise<AxiosResponse<EditUserInfoResponseDto>> => {
  const { bodyParam } = payload;
  try {
    const res: AxiosResponse<EditUserInfoResponseDto> = await axiosPrivateInstance.put('/api/users', bodyParam);
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const userService = {
  getUserInfo,
  editProfile
}