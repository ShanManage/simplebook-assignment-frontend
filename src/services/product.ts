import { AxiosResponse } from "axios";
import { 
  CreateProductPayloadDto,
  CreateProductResponseDto,
} from "../interfaces";
import { axiosPrivateInstance } from ".";

const createProduct = async (
  payload: CreateProductPayloadDto,
): Promise<AxiosResponse<CreateProductResponseDto>> => {
  const { bodyParam } = payload;
  try {
    const res: AxiosResponse<CreateProductResponseDto> = await axiosPrivateInstance.post('/api/products', bodyParam);
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const productService = {
  createProduct
}