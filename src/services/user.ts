import { AxiosResponse } from "axios";
import { UserDto } from "../interfaces";
import { axiosPrivateInstance } from ".";

const getUserInfo = async (): Promise<AxiosResponse<UserDto>> => {
  try {
    const res: AxiosResponse<UserDto> = await axiosPrivateInstance.get('/api/users/');
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const userService = {
  getUserInfo
}