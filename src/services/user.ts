import { AxiosResponse } from "axios";
import {
  EditUserImagePayloadDto,
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

const editProfileImage = async (
  payload: EditUserImagePayloadDto,
): Promise<AxiosResponse<EditUserInfoResponseDto>> => {
  const { bodyParam } = payload;
  try {
    const res: AxiosResponse<EditUserInfoResponseDto> = await axiosPrivateInstance.patch('/api/users/image', bodyParam);
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const userService = {
  getUserInfo,
  editProfile,
  editProfileImage
}