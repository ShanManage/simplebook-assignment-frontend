import { AxiosResponse } from "axios";
import {
  CreateNewUserPayloadDto,
  CreateNewUserResponseDto,
} from "../interfaces";
import { axiosPrivateInstance } from ".";

const createUser = async (
  payload: CreateNewUserPayloadDto,
): Promise<AxiosResponse<CreateNewUserResponseDto>> => {
  const { bodyParam } = payload;
  try {
    const res: AxiosResponse<CreateNewUserResponseDto> = await axiosPrivateInstance.post('/api/users', bodyParam);
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const authService = {
  createUser
}